import { expect } from 'chai';
import { processInput, matchChecker, getMatches } from '../matchWord.mjs';
import ocrResponse from './sampleData/testOCR.mjs'

describe('Matching food name in database', () => {
  it('Processes and filters relevant key word', () => {
    // should return processed word in an object
    const { original, processed } = processInput('msia chicken 100g');
    expect(original).to.equal('msia chicken 100g');
    expect(processed).to.equal('msia chicken');
  });
  it('Matches likely name with foodnames in database', () => {
    // should return processed word in an object
    const { parsedName, word, match } = matchChecker('msia chicken 100g', 'msia chicken');
    expect(parsedName).to.equal('msia chicken');
    expect(word).to.equal('msia chicken 100g');
    expect(match).to.be.an.instanceof(Array);
  })
    it('Returns array of possible matches', () => {
    // should return processed word in an object
    const matchesResult = getMatches(ocrResponse[0])
    expect(matchesResult).to.be.an.instanceof(Array);
  })
})