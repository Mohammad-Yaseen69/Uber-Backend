import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config({
    path: '../.env'
})

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


import userRouter from './routes/user.routes.js'
import driverRouter from './routes/driver.routes.js'

app.use('/api/v1/users', userRouter)
app.use('/api/v1/driver', driverRouter)

export default app