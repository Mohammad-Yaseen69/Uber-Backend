import app from "./app.js";
import { connectDB } from "./db/connectDB.js";
import http from 'http'


const server = http.createServer(app)
const port = process.env.PORT || 4000

connectDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })