import { Router } from "express"
import { login, logout, register, getProfile, updateProfile } from '../controllers/driver.controllers.js'
import { driverValidations } from "../utils/validators.js"
import { userAuth } from "../middlewares/auth.middleware.js"

const router = Router()

router.post('/register', driverValidations.Register, register)
router.post('/login', login)

// Protected Routes
router.get('/logout', userAuth, logout)
router.get('/profile', userAuth, getProfile)
router.post('/update-profile', userAuth, updateProfile)

export default router