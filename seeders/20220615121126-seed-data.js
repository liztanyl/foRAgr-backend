const foodItems = require('./data/food_items.js');
const categories = require('./data/categories.js');
const storage = require('./data/storage.js');
const shelfLifeItems = require('./data/shelf_life_items.js');

module.exports = {
  async up(queryInterface) {
    foodItems.forEach((item) => {
      item.created_at = new Date();
      item.updated_at = new Date();
    });
    categories.forEach((item) => {
      item.created_at = new Date();
      item.updated_at = new Date();
    });
    storage.forEach((item) => {
      item.created_at = new Date();
      item.updated_at = new Date();
    });
    shelfLifeItems.forEach((item) => {
      item.created_at = new Date();
      item.updated_at = new Date();
    });

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'a@a.com',
        password: 'a',
        name: 'User A',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('food_items', foodItems);
    await queryInterface.bulkInsert('categories', categories);
    await queryInterface.bulkInsert('storage', storage);
    await queryInterface.bulkInsert('shelf_life_items', shelfLifeItems);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('shelf_life_items', null, {});
    await queryInterface.bulkDelete('food_items', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('storage', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
