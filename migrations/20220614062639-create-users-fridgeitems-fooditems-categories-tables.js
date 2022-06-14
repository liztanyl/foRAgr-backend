"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			login_credential: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable("categories", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable("food_items", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			category_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "categories",
					key: "id",
				},
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			shelf_life_days: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			freezer: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			fridge: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			pantry: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable("fridge_items", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
			},
			food_item_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "food_items",
					key: "id",
				},
			},
			added_on: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			expiry: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			price: {
				allowNull: true,
				type: Sequelize.DECIMAL(10, 2),
			},
			notes: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("fridge_items");
		await queryInterface.dropTable("food_items");
		await queryInterface.dropTable("categories");
		await queryInterface.dropTable("users");
	},
};
