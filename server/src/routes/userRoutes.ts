import {Router} from 'express'
import UserController from '@controllers/UsersController'
const router= Router()

router.get('/',UserController.index)
router.post('/', UserController.store)

export default router