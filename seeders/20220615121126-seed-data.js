'use strict';
const food_items = require('./data/food_items');
const categories = require('./data/categories');
const storage = require('./data/storage');
const shelf_life_items = require('./data/shelf_life_items');

module.exports = {
	async up(queryInterface, Sequelize) {
		food_items.forEach((item) => {
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
		shelf_life_items.forEach((item) => {
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
		await queryInterface.bulkInsert('food_items', food_items);
		await queryInterface.bulkInsert('categories', categories);
		await queryInterface.bulkInsert('storage', storage);
		await queryInterface.bulkInsert('shelf_life_items', shelf_life_items);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('shelf_life_items', null, {});
		await queryInterface.bulkDelete('food_items', null, {});
		await queryInterface.bulkDelete('categories', null, {});
		await queryInterface.bulkDelete('storage', null, {});
		await queryInterface.bulkDelete('users', null, {});
	},
};
