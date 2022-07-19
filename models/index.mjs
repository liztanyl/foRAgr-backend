import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initCategoryModel from './category.mjs';
import initFoodItemModel from './foodItem.mjs';
import initFridgeItemModel from './fridgeItem.mjs';
import initShelfLifeItemModel from './shelfLifeItem.mjs';
import initStorageModel from './storage.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];
const db = {};
let sequelize;

if (env === 'production') {
  // Break apart the Heroku database url and rebuild the configs we need
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
}

// If env is not production, retrieve DB auth details from the config
else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
db.FoodItem = initFoodItemModel(sequelize, Sequelize.DataTypes);
db.FridgeItem = initFridgeItemModel(sequelize, Sequelize.DataTypes);
db.ShelfLifeItem = initShelfLifeItemModel(sequelize, Sequelize.DataTypes);
db.Storage = initStorageModel(sequelize, Sequelize.DataTypes);

db.FridgeItem.belongsTo(db.User);
db.User.hasMany(db.FridgeItem);

db.FridgeItem.belongsTo(db.ShelfLifeItem);
db.ShelfLifeItem.hasMany(db.FridgeItem);

db.FoodItem.hasMany(db.ShelfLifeItem);
db.ShelfLifeItem.belongsTo(db.FoodItem);
db.FoodItem.belongsToMany(db.Storage, { through: db.ShelfLifeItem });
db.FoodItem.belongsToMany(db.Category, { through: db.ShelfLifeItem });

db.Category.hasMany(db.ShelfLifeItem);
db.ShelfLifeItem.belongsTo(db.Category);
db.Category.belongsToMany(db.FoodItem, { through: db.ShelfLifeItem });
db.Category.belongsToMany(db.Storage, { through: db.ShelfLifeItem });

db.Storage.hasMany(db.ShelfLifeItem);
db.ShelfLifeItem.belongsTo(db.Storage);
db.Storage.belongsToMany(db.FoodItem, { through: db.ShelfLifeItem });
db.Storage.belongsToMany(db.Category, { through: db.ShelfLifeItem });

export default db;
