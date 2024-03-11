import { Router } from 'express'
import { getLatest, createOne, getById } from '../controllers/product'

const router = Router()

// todo: validate request
router.post('/', createOne)
router.get('/latest', getLatest)
router.get('/:id', getById)

export default router