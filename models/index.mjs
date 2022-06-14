import { Sequelize } from "sequelize";
import allConfig from "../config/config.js";

import initUserModel from "./user.mjs";
import initCategoryModel from "./category.mjs";
import initFoodItemModel from "./foodItem.mjs";
import initFridgeItemModel from "./fridgeItem.mjs";

const env = process.env.NODE_ENV || "development";

const config = allConfig[env];
const db = {};

const sequelize = new Sequelize(
	config.database,
	config.usename,
	config.password,
	config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
db.FoodItem = initFoodItemModel(sequelize, Sequelize.DataTypes);
db.FridgeItem = initFridgeItemModel(sequelize, Sequelize.DataTypes);

db.FridgeItem.belongsTo(db.User);
db.User.hasMany(db.FridgeItem);

db.FridgeItem.belongsTo(db.FoodItem);
db.FoodItem.hasMany(db.FridgeItem);

db.FoodItem.belongsTo(db.Category);
db.Category.hasMany(db.FoodItem);

export default db;
