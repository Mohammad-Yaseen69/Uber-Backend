import { Router } from "express"
import { login, logout, register, getProfile, updateProfile, addDetails, resendOtp, verifyOtp } from '../controllers/driver.controllers.js'
import { driverValidations } from "../utils/validators.js"
import { userAuth } from "../middlewares/auth.middleware.js"

const router = Router()

router.post('/register', driverValidations.Register, register)
router.post('/login', login)
router.post('/resendOtp', resendOtp)
router.post('/verifyOtp', verifyOtp)

// Protected Routes
router.get('/logout', userAuth, logout)
router.put('/updateDetails', userAuth, driverValidations.AddDetails , addDetails)
router.get('/profile', userAuth, getProfile)
router.post('/update-profile', userAuth, updateProfile)

export default router