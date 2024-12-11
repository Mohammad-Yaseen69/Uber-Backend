import { Router } from "express"
import { Login, register, logout } from "../controllers/user.controllers.js"

const router = Router()

router.post('/register', register)
router.post('/login', Login)
router.get('/logout', logout)

export default router