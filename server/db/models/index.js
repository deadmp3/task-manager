import fs from 'mz/fs';
import path from 'path';
import Sequelize from 'sequelize';
import configData from '../../../assets/db/config.json';

export default async () => {
  const db = {};

  const basename = path.basename(__filename);

  const env = process.env.NODE_ENV;
  const config = configData[env];
  const sequelize = new Sequelize(config.use_env_variable ? process.env[config.use_env_variable] : config);

  const files = await fs.readdir(__dirname);
  files
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });
  await Object.keys(db).forEach(async (modelName) => {
    const model = db[modelName];
    if (model.associate) {
      model.associate(db);
    }
    if (model.predefine) {
      await model.predefine();
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
