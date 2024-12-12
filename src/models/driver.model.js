import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

const driverSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    vehical: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, , 'Capacity must be atleast 1']
        },
        vehicalType: {
            type: String,
            required: true,
            enum: ['bike', 'car', 'auto']
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    profilePic: String,
    socketId: String
}, { timestamps: true })

driverSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    )
}

driverSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

driverSchema.pre("save", async function () {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const Driver = mongoose.model("Driver", driverSchema)