import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
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
    profilePic: String,
    socketId: String
}, { timestamps: true })

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    )
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.pre("save" ,async function(){
    try {
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 10)
        }
    } catch (error) {
        console.log(error.message)
    }
})



export const User = mongoose.model("User", userSchema)