import express from 'express'
import cors from 'cors'
import sequelize from './config/connection.js';

import dotenv  from 'dotenv'
dotenv.config()

const app = express()

import { dirname } from 'path'
import { fileURLToPath } from 'url'

import positionsRouter from './routes/positionsRoutes.js'
import menuItemRouter from './routes/menuItemsRoutes.js'
import authRouter from './routes/authRoutes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const path = __dirname + '/views/'

// only when ready to deploy
app.use(express.static(path))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/careers', positionsRouter)
app.use('/api/v1/menu', menuItemRouter)
app.use('/api/v1/auth', authRouter)

app.get('/', (req,res) => {
  res.json({msg: 'hello!'});
})

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path + 'index.html')
})

const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
})
