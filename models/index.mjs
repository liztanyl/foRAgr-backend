import { Sequelize } from "sequelize";
import allConfig from "../config/config.js";

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

// INITIATE MODELS

// DECLARE MODEL RELATIONSHIPS

export default db;
