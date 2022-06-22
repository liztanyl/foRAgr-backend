/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
import { formatFoodItem } from '../controllers/foodItems.mjs';

const { assert } = chai;

const foodItem = {
  id: 153,
  name: 'fish',
  createdAt: '2022-06-21T14:10:24.459Z',
  updatedAt: '2022-06-21T14:10:24.459Z',
  shelf_life_items: [
    {
      id: 198,
      foodItemId: 153,
      categoryId: 9,
      storageId: 2,
      shelfLifeDays: 180,
      createdAt: '2022-06-21T14:10:24.459Z',
      updatedAt: '2022-06-21T14:10:24.459Z',
      category: {
        id: 9,
        name: 'Seafood',
        createdAt: '2022-06-21T14:10:24.459Z',
        updatedAt: '2022-06-21T14:10:24.459Z',
      },
      storage: {
        id: 2,
        name: 'Freezer',
        createdAt: '2022-06-21T14:10:24.459Z',
        updatedAt: '2022-06-21T14:10:24.459Z',
      },
    },
    {
      id: 199,
      foodItemId: 153,
      categoryId: 9,
      storageId: 1,
      shelfLifeDays: 3,
      createdAt: '2022-06-21T14:10:24.459Z',
      updatedAt: '2022-06-21T14:10:24.459Z',
      category: {
        id: 9,
        name: 'Seafood',
        createdAt: '2022-06-21T14:10:24.459Z',
        updatedAt: '2022-06-21T14:10:24.459Z',
      },
      storage: {
        id: 1,
        name: 'Fridge',
        createdAt: '2022-06-21T14:10:24.459Z',
        updatedAt: '2022-06-21T14:10:24.459Z',
      },
    },
  ],
};

const mainResult = formatFoodItem(foodItem);

const {
  name: returnedName,
  categories: returnedCategories,
  category: returnedCategory,
  storageMethod: returnedStorageMethod,
  shelfLifeDays: returnedShelfLifeDays,
  purchaseDate: returnedPurchaseDate,
  expiryDate: returnedExpiryDate,
  notes: returnedNotes,
} = mainResult;

describe('formatFoodItem', () => {
  describe('function', () => {
    it('Function should be a function', () => {
      assert.isFunction(formatFoodItem);
    });

    it('Function should return an object', () => {
      assert.typeOf(mainResult, 'object');
    });

    it('Object returned should have all appropriate keys', () => {
      assert.hasAllKeys(mainResult, ['name', 'categories', 'category', 'storageMethod', 'shelfLifeDays', 'purchaseDate', 'expiryDate', 'notes']);
    });
  });

  describe('return', () => {
    describe('name', () => {
      it('Returned Name should be a string that is not empty', () => {
        assert.typeOf(returnedName, 'string');
        assert.isAbove(returnedName.length, 0);
      });
    });

    describe('categories', () => {
      it('Returned Categories should be a array that is not empty', () => {
        assert.typeOf(returnedCategories, 'array');
        assert.isAbove(returnedCategories.length, 0);
      });
    });

    describe('all other keys', () => {
      it('All Other Keys should be empty stings', () => {
        assert.typeOf(returnedCategory, 'string');
        assert.isEmpty(returnedCategory);
        assert.typeOf(returnedStorageMethod, 'string');
        assert.isEmpty(returnedStorageMethod);
        assert.typeOf(returnedShelfLifeDays, 'string');
        assert.isEmpty(returnedShelfLifeDays);
        assert.typeOf(returnedPurchaseDate, 'string');
        assert.isEmpty(returnedPurchaseDate);
        assert.typeOf(returnedExpiryDate, 'string');
        assert.isEmpty(returnedExpiryDate);
        assert.typeOf(returnedNotes, 'string');
        assert.isEmpty(returnedNotes);
      });
    });
  });
});
