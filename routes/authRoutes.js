import express from 'express'
const router = express.Router()

import { register, getAllUsers, updateUser, deleteUser } from '../controllers/authController.js'

router.route('/register')
  .post(register)

router.route('/users')
  .get(getAllUsers)

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser)

export default router
