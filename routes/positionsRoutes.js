import express from 'express'
const router = express.Router()

import { 
  createPosition,
  deletePosition,
  getAllPositions,
  getPositionById,
  updatePosition
} from '../controllers/positionsController.js'

router.route('/positions')
  .get(getAllPositions)
  .post(createPosition)

router.route('/positions/:id')
  .get(getPositionById)
  .put(updatePosition)
  .delete(deletePosition)

export default router