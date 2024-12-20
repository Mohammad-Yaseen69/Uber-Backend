import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { validationResult } from "express-validator"
import { cookieOptions } from "../constants.js";

const generateTokenForCookies = async (user) => {
    try {
        const token = await user.generateToken()
        return token

    } catch (error) {
        console.log(error.message)
        throw new ApiError(500, "Token generation failed")
    }
}

const register = asyncHandler(async (req, res) => {
    const { fullName, email, password, profilePic } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg)
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        profilePic: profilePic || ""
    })

    if (!user) {
        throw new ApiError(500, "Something went wrong")
    }

    const token = await generateTokenForCookies(user)

    return res.status(201).cookie("token", token, cookieOptions).json(
        new ApiResponse(201, user, "User created successfully")
    )
})

const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "Invalid Email")
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        throw new ApiError(400, "Invalid Password")
    }

    const token = await generateTokenForCookies(user)

    return res.status(200).cookie("token", token, cookieOptions).json(
        new ApiResponse(200, user, "User logged in successfully")
    )
})

const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", cookieOptions)
    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -__v -createdAt -updatedAt")
    return res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    )
})

const updateUser = asyncHandler(async (req, res) => {
    const { fullName, profilePic } = req.body

    const obj = {}

    if (fullName) obj.fullName = fullName
    if (profilePic) obj.profilePic = profilePic

    const user = await User.findByIdAndUpdate(
        req.user._id, obj,
        { new: true }).select("-password -__v -createdAt -updatedAt")

    return res.status(200).json(
        new ApiResponse(200, user, "User updated successfully")
    )
})

export {
    register,
    Login,
    logout,
    getUser,
    updateUser
}