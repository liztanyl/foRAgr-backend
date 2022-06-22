/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
import moment from 'moment';
import { formatFridgeItem } from '../controllers/fridgeItems.mjs';

const { assert } = chai;

const item = {
  id: 1,
  userId: 1,
  shelfLifeItemId: 49,
  addedOn: '2022-06-21T14:10:24.458Z',
  expiry: '2022-07-21T14:10:24.458Z',
  price: null,
  notes: 'nothing',
  notificationIdentifier: 'abc',
  createdAt: '2022-06-21T14:10:24.458Z',
  updatedAt: '2022-06-21T14:10:24.458Z',
  shelf_life_item: {
    id: 49,
    foodItemId: 35,
    categoryId: 7,
    storageId: 2,
    shelfLifeDays: 300,
    food_item: {
      id: 35,
      name: 'berries',
    },
    category: {
      id: 7,
      name: 'Fruits & Vegetables',
    },
    storage: {
      id: 2,
      name: 'Freezer',
    },
  },
};

const mainResult = formatFridgeItem(item);

const {
  id: returnedId,
  name: returnedName,
  category: returnedCategory,
  storageMethod: returnedStorageMethod,
  shelfLifeDays: returnedShelfLifeDays,
  purchaseDate: returnedPurchaseDate,
  expiryDate: returnedExpiryDate,
  notes: returnedNotes,
} = mainResult;

const acceptedCategories = ['Dairy / Eggs', 'Bakery / Baking Needs', 'Beverages', 'Breakfast', 'Canned Food', 'Breakfast', 'Fruits & Vegetables', 'Meat', 'Seafood', 'Snacks', 'Rice / Noodles / Pasta', 'Oil / Cooking Paste & Sauces', 'Condiments & Seasonings', 'Soups', 'Dried / Preserved Food'];

describe('formatFridgeItem', () => {
  describe('function', () => {
    it('Function should be a function', () => {
      assert.isFunction(formatFridgeItem);
    });

    it('Function should return an object', () => {
      assert.typeOf(mainResult, 'object');
    });

    it('Object returned should have all appropriate keys', () => {
      assert.hasAllKeys(mainResult, ['id', 'name', 'category', 'storageMethod', 'shelfLifeDays', 'purchaseDate', 'expiryDate', 'notes']);
    });
  });

  describe('return', () => {
    describe('id', () => {
      it('Returned ID should be a number above 0', () => {
        assert.typeOf(returnedId, 'number');
        assert.isAbove(returnedId, 0);
      });
    });

    describe('name', () => {
      it('Returned Name should be a string that is not empty', () => {
        assert.typeOf(returnedName, 'string');
        assert.isAbove(returnedName.length, 0);
      });
    });

    describe('category', () => {
      it('Returned Category should be a string', () => {
        assert.typeOf(returnedCategory, 'string');
      });

      it('Returned Category one of the accepted categories', () => {
        assert.oneOf(returnedCategory, acceptedCategories);
      });
    });

    describe('storage', () => {
      it('Returned Storage Method should be a string', () => {
        assert.typeOf(returnedStorageMethod, 'string');
      });

      it('Returned Storage Method is either "Freezer", "Fridge" or "Pantry"', () => {
        assert.oneOf(returnedStorageMethod, ['Freezer', 'Fridge', 'Pantry']);
      });
    });

    describe('shelf life days', () => {
      it('Returned Shelf Life Days should be a number above 0', () => {
        assert.typeOf(returnedShelfLifeDays, 'number');
        assert.isAbove(returnedShelfLifeDays, 0);
      });
    });

    describe('purchase date', () => {
      it('Returned Purchase Date should be a string', () => {
        assert.typeOf(returnedPurchaseDate, 'string');
      });

      it('Returned Purchase Date should be a valid date', () => {
        assert.isTrue(moment(returnedPurchaseDate).isValid());
      });
    });

    describe('expiry date', () => {
      it('Returned Expiry Date should be a string', () => {
        assert.typeOf(returnedExpiryDate, 'string');
      });

      it('Returned Expiry Date should be a valid date', () => {
        assert.isTrue(moment(returnedExpiryDate).isValid());
      });
    });

    describe('notes', () => {
      it('Returned Notes should be a string', () => {
        assert.typeOf(returnedNotes, 'string');
      });
    });
  });
});
