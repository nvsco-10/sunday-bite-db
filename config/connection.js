import dotenv  from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'

let sequelize;

process.env.JAWSDB_URL 
  ? sequelize = new Sequelize(process.env.JAWSDB_URL)
  : sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})


export default sequelize