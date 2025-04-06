import express from 'express'
import { getAll, getUserById , createUser , updateUser, destroyUserById} from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get('/users', authMiddleware, getAll)
router.get('/users/:id',authMiddleware, getUserById)
router.post('/users' , createUser)
router.put('/users/:id', authMiddleware, updateUser)
router.delete('/users/:id', authMiddleware, destroyUserById)

export default router;