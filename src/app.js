import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({
    path: '../.env'
})

const app = express()

app.use(cors())

export default app