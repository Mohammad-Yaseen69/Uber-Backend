import { Router } from "express"
import { Login, register, logout } from "../controllers/user.controllers.js"
import { userAuth } from "../middlewares/auth.middleware.js"
import {userValidations} from '../utils/validators.js'

const router = Router()

router.post('/register', userValidations.Register ,register)
router.post('/login', Login)

// Secure Routes
router.get('/logout', userAuth, logout)

export default router