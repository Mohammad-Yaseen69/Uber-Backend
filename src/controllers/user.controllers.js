import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { validationResult } from "express-validator"
import { cookieOptions } from "../constants.js";
import { generateOtp } from "../utils/generateOtp.js";
import { Otp } from "../models/otp.model.js"
import { sendEmail } from "../utils/sendEmail.js"
import { deleteImage, uploadImage } from "../utils/cloudinary.js"

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
        throw new ApiError(400, "Invalid OTP");
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

        return res.status(201).cookie("token", token, cookieOptions).cookie("loggedIn", true, { maxAge: 30 * 24 * 60 * 60 * 1000 , secure: true, sameSite: "strict" }).json(
            new ApiResponse(201, user, "User Registered Successfully",)
        );
    } else {
        await otpExists.deleteOne();

        const token = await generateTokenForCookies(user);

        return res.status(201).cookie("token", token, cookieOptions).cookie("loggedIn", true, { maxAge: 30 * 24 * 60 * 60 * 1000 , secure: true, sameSite: "strict" }).json(
            new ApiResponse(200, user, "User Logged in Successfully")
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
        new ApiResponse(200, {}, "Otp Resent Successfully")
    )
})


const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", cookieOptions)
    res.clearCookie("loggedIn",{ maxAge: 30 * 24 * 60 * 60 * 1000 , secure: true, sameSite: "strict" })
    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -__v -createdAt -updatedAt")
    return res.status(200).json(
        new ApiResponse(200,
            {
                type: "User",
                data: user
            }, "User fetched successfully")
    )
})

const updateUser = asyncHandler(async (req, res) => {
    const { fullName, isDeletingPfp } = req.body
    const profilePic = req.file?.path

    const obj = {}

    if ((req.user?.profilePic && profilePic) || (req.user?.profilePic && isDeletingPfp)) {
        const parts = req.user?.profilePic.split("/")
        const publicPath = `${parts[parts.length - 2]}/${parts[parts.length - 1].split(".")[0]}`
        await deleteImage(publicPath)
        if (isDeletingPfp) {
            obj.profilePic = ""
        }
    }

    if (profilePic) {
        const uploadedImage = await uploadImage(profilePic)
        if (uploadedImage.ok) {
            obj.profilePic = uploadedImage.response?.url
        }
    }


    if (fullName) obj.fullName = fullName

    const userUpdated = await User.findByIdAndUpdate(
        req.user._id, obj,
        { new: true }).select("-password -__v -createdAt -updatedAt")

    return res.status(200).json(
        new ApiResponse(200, userUpdated, "User updated successfully")
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