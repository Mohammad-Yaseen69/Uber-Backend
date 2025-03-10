import { Router } from "express"
import { Login, register, logout, getUser, updateUser, resendOtp, verifyOtp } from "../controllers/user.controllers.js"
import { userAuth } from "../middlewares/auth.middleware.js"
import { userValidations } from '../utils/validators.js'
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.post('/register', userValidations.Register, register)
router.post('/login', Login)
router.post("/verifyOtp", verifyOtp)
router.post("/resendOtp", resendOtp)

// Secure Routes
router.get('/logout', userAuth, logout)
router.get('/get-user', userAuth, getUser)
router.post('/update-user', userAuth, upload.single("pfp"), updateUser)

export default router