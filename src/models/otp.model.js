import mongoose from "mongoose"

const otpSchema  = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 3600
    }
},{timestamps: true})

export const Otp = mongoose.model("Otp", otpSchema)