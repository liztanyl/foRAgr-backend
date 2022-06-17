import fuzzysearch from 'fuzzysearch';
import { distance } from 'fastest-levenshtein';
import stringSimilarity from 'string-similarity';
import nlp from 'compromise';
import datePlugin from 'compromise-dates';
import { matchSorter } from 'match-sorter';
import receiptKeyWords from './ingredientsData/blacklistedWords.mjs';
import ocrResponse4 from './ingredientsData/sampleData/testOCR4.mjs';
import ingredientsList from './ingredientsData/foodItemsDatam.mjs';

nlp.plugin(datePlugin);

const foundData = [];

const processInput = (inputTerms) => {
  const originalTerm = inputTerms;
  const newTerm = originalTerm.replace(/\//g, ' ');
  const removedNumbersAttached = newTerm.replace(/(\d+)/g, ' ');

  const doc = nlp(removedNumbersAttached);
  const regex = /(?:\d.\d{1,3}\s?(x|X)\s?\d.\d{1,3})/g;
  if (
    inputTerms.match(/(S\(\d{6}\))/g) ||
    inputTerms.match(regex) !== null ||
    receiptKeyWords.some((word) => inputTerms.includes(word))
  ) {
    return '';
  }
  doc.prepositions().remove();
  doc.adjectives().remove();
  doc.pronouns().remove();
  doc.numbers().remove();
  doc.places().remove();
  doc.urls().remove();
  doc.match('roast').remove();
  return {
    original: originalTerm,
    processed: doc.text(),
  };
};
//takes in possible matches(objects)
const setOcrTest = (foundNames) => {
  [...foundData, ...foundNames];
  console.log(foundNames);
};

const matchChecker = (detectedInput, originalName) => {
  const ingredientsListSplit = ingredientsList.map((item) => ({
    keyWords: item.split(' '),
    itemName: item,
  }));
  const splitInput = detectedInput.split(' ');

  if (detectedInput.length !== 0) {
    // confirmed matches
    const checkExactMatch = matchSorter(ingredientsListSplit, detectedInput, {
      keys: ['itemName'],
    });

    if (checkExactMatch.length > 0) {
      setOcrTest([
        {
          parsedName: originalName,
          word: detectedInput,
          match: checkExactMatch.flat(),
        },
      ]);
    } else {
      // unsure matches
      const likelyMatches = [];
      ingredientsListSplit.forEach((ingredient) => {
        ingredient.keyWords.forEach((word) => {
          if (
            fuzzysearch(detectedInput, word) ||
            fuzzysearch(word, detectedInput)
          ) {
            const similarityValue = distance(
              detectedInput,
              ingredient.itemName
            );

            if (
              stringSimilarity.compareTwoStrings(
                ingredient.itemName,
                detectedInput
              ) > 0.45
            ) {
              likelyMatches.push({ ...ingredient, value: similarityValue });
              const found = likelyMatches.some(
                (match) => match.itemName === ingredient.itemName
              );
              if (!found) {
                likelyMatches.push({ ...ingredient, value: similarityValue });
              }
            }
          }
        });
      });
      likelyMatches.sort((a, b) => a.value - b.value);

      if (likelyMatches.length > 0) {
        setOcrTest([
          {
            parsedName: originalName,
            word: detectedInput,
            match: likelyMatches,
          },
        ]);
      } else {
        // unsure matches
        const possibleMatches = [];

        for (let i = 0; i < ingredientsListSplit.length; i += 1) {
          ingredientsListSplit[i].keyWords.forEach((word) => {
            splitInput.forEach((inputWord) => {
              if (
                fuzzysearch(inputWord, word) ||
                fuzzysearch(word, inputWord)
              ) {
                const currentIngredient = ingredientsListSplit[i];
                if (
                  stringSimilarity.compareTwoStrings(
                    currentIngredient.itemName,
                    detectedInput
                  ) > 0.45
                ) {
                  const similarityValue = distance(
                    detectedInput,
                    ingredientsListSplit[i].itemName
                  );
                  const found = possibleMatches.some(
                    (match) => match.itemName === currentIngredient.itemName
                  );
                  if (!found) {
                    possibleMatches.push({
                      ...currentIngredient,
                      value: similarityValue,
                    });
                  }
                }
              }
            });
          });
        }
        possibleMatches.sort((a, b) => a.value - b.value);
        setOcrTest([
          {
            parsedName: originalName,
            word: detectedInput,
            match: possibleMatches,
          },
        ]);
      }
    }
  }
};

//sample data
const ocr = ocrResponse4[0].description.split('\n');

const getMatches = () => {
  ocr.forEach((lineItem) => {
    const { original, processed } = processInput(lineItem.toLowerCase());
    if (processed !== undefined) {
      matchChecker(processed, original);
      return foundData;
    }
  });
};

console.log(getMatches(), 'DATAAAAAA');
