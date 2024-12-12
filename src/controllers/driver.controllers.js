import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { validationResult } from "express-validator"
import { Driver } from "../models/driver.model.js"; 
import  {cookieOptions} from '../constants.js'

const generateTokenForCookies = async (driver) => {
    try {
        const token = await driver.generateToken()
        return token

    } catch (error) {
        console.log(error.message)
        throw new ApiError(500, "Token generation failed")
    }
}

const register = asyncHandler(async (req, res) => {
    const {fullName, email, password, color, vehicalType, capacity, plate, profilePic } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg)
    }

    const existedUser = await Driver.findOne({ email }) || await User.findOne({ email })

    if(existedUser) {
        throw new ApiError(400, "Email Already in use")
    }

    const driver = await Driver.create({
        fullName,
        email,
        password,
        vehical: {
            color,
            vehicalType,
            capacity,
            plate
        },
        profilePic: profilePic || ""
    })

    if(!driver){
        throw new ApiError(400, "Something went wrong")
    }

    const token = await generateTokenForCookies(driver)

    
    res.status(201).cookie('token', token, cookieOptions).json(
        new ApiResponse(201, driver, "Driver Created Successfully")
    )
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg)
    }

    const driver = await Driver.findOne({ email })

    if(!driver){
        throw new ApiError(400, "Driver does not exist")
    }

    const isMatch = await driver.matchPassword(password)

    if(!isMatch){
        throw new ApiError(400, "Invalid credentials")
    }

    const token = await generateTokenForCookies(driver)

    res.status(200).cookie('token', token, cookieOptions).json(
        new ApiResponse(200, driver, "Driver logged in successfully")
    )
})

const logout = asyncHandler(async (req, res) => {
    res.status(200).clearCookie('token').json(
        new ApiResponse(200, {}, "Driver logged out successfully")
    )
})

const getProfile = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.driver._id)

    if(!driver){
        throw new ApiError(400, "Driver does not exist")
    }

    res.status(200).json(
        new ApiResponse(200, driver, "Driver profile fetched successfully")
    )
})

const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email, password, color, vehicalType, capacity, plate, profilePic } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg)
    }

    const driver = await Driver.findById(req.driver._id)

    if(!driver){
        throw new ApiError(400, "Driver does not exist")
    }

    driver.fullName = fullName || driver.fullName
    driver.email = email || driver.email
    driver.password = password || driver.password
    driver.vehical.color = color || driver.vehical.color
    driver.vehical.vehicalType = vehicalType || driver.vehical.vehicalType
    driver.vehical.capacity = capacity || driver.vehical.capacity
    driver.vehical.plate = plate || driver.vehical.plate
    driver.profilePic = profilePic || driver.profilePic

    await driver.save()

    res.status(200).json(
        new ApiResponse(200, driver, "Driver profile updated successfully")
    )
})

export {
    register,
    login,
    logout,
    getProfile,
    updateProfile
}