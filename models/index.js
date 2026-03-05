import 'dotenv/config';
import { createRequire } from 'module';
import { Sequelize } from 'sequelize';
import BookModule from './Book.js';
import BookLibraryModule from './BookLibrary.js';

// Load the CommonJS config (config/ has its own package.json with "type":"commonjs")
const require = createRequire(import.meta.url);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Book = BookModule(sequelize, Sequelize.DataTypes);
const BookLibrary = BookLibraryModule(sequelize, Sequelize.DataTypes);

// Wire up associations
const db = { Book, BookLibrary };
Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') model.associate(db);
});

export { Book, BookLibrary, sequelize, Sequelize };
