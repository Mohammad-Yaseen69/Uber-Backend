import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
        return connectionInstance.connection.host
    } catch (error) {
        console.log("MONGODB connection FAILED ", error)
        process.exit(1)
    }
}

export {
    connectDB
}