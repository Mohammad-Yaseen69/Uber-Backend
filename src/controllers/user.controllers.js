import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { validationResult } from "express-validator"
import { cookieOptions } from "../constants.js";
import { generateOtp } from "../utils/generateOtp.js";
import { Otp } from "../models/otp.model.js"
import { sendEmail } from "../utils/sendEmail.js"

const generateTokenForCookies = async (user) => {
    try {
        const token = await user.generateToken()
        return token

    } catch (error) {
        console.log(error.message)
        throw new ApiError(500, "Token generation failed")
    }
}

const createOtp = async (email) => {
    const otp = await generateOtp()

    const isOtpExist = await Otp.findOne({ otp, email })

    if (isOtpExist) {
        await isOtpExist.deleteOne()
    }

    const otpSended = await Otp.create({
        otp: otp,
        email: email
    })

    if (!otpSended) {
        throw new ApiError(401, "Something went wrong while sending the otp")
    }
    await
        sendEmail("Otp For Uber", "",
            `
        <div>
        <p style="fontSize: "18px"; fontWeight: 600;> Your Otp For Creating Account on Uber is: <p/>
        <p style="fontSize: "32px"> ${otp} <p/>
        <p> This otp will expire in 1 hour </p>
        </div>
        `, email)
}

const register = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg)
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(400, "User already exists")
    }

    await createOtp(email)

    return res.status(200).json(
        new ApiResponse(200, null, "Otp Sent to your Email")
    )
})

const verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const { email, fullName, password, phoneNumber } = req.body.user || {};

    if (!otp || !email) {
        throw new ApiError(400, "OTP and Email are Required");
    }

    const otpExists = await Otp.findOne({ otp, email });

    if (!otpExists) {
        throw new ApiError(401, "Invalid OTP");
    }

    let user = await User.findOne({ email });

    if (!user) {
        if (!fullName || !password || !phoneNumber) {
            throw new ApiError(400, "Please Provide fullName, password, and phoneNumber for Registration");
        }

        user = await User.create({
            email,
            fullName,
            phoneNumber,
            password,
        });

        await otpExists.deleteOne();

        const token = await generateTokenForCookies(user);

        return res.status(201).cookie("token", token).json(
            new ApiResponse(201, "User Registered and Logged in Successfully", user)
        );
    } else {
        await otpExists.deleteOne();

        const token = await generateTokenForCookies(user);

        return res.status(200).cookie("token", token).json(
            new ApiResponse(200, "User Logged in Successfully", user)
        );
    }
});


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


    await createOtp(email)

    return res.status(200).json(
        new ApiResponse(200, user, "Otp Sent Please Check your Email")
    )
})

const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new ApiError(400, "Email is Required")
    }

    await createOtp(email)

    return res.status(200).json(
        new ApiResponse(200, {} , "Otp Resent Successfully")
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
    updateUser,
    verifyOtp,
    resendOtp
}