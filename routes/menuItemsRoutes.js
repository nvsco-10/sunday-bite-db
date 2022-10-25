import express from 'express'
const router = express.Router()

import { 
  createMenuItem, 
  deleteMenuItem, 
  getAllMenuItems 
} from '../controllers/menuItemsController.js'

router.route('/')
  .get(getAllMenuItems)
  .post(createMenuItem)

router.route('/:id')
  .delete(deleteMenuItem)

export default router