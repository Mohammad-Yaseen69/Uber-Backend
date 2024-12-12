import { Router } from "express"
import { Login, register, logout, getUser } from "../controllers/user.controllers.js"
import { userAuth } from "../middlewares/auth.middleware.js"
import {userValidations} from '../utils/validators.js'

const router = Router()

router.post('/register', userValidations.Register ,register)
router.post('/login', Login)

// Secure Routes
router.get('/logout', userAuth, logout)
router.get('/get-user', userAuth, getUser)

export default router