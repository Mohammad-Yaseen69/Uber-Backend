import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { validationResult } from "express-validator";
import { Driver } from "../models/driver.model.js";
import { cookieOptions } from '../constants.js';
import { generateOtp } from "../utils/generateOtp.js";
import { Otp } from "../models/otp.model.js";
import { sendEmail } from "../utils/sendEmail.js";

const generateTokenForCookies = async (driver) => {
    try {
        const token = await driver.generateToken();
        return token;
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "Token generation failed");
    }
};

const createOtp = async (email) => {
    const otp = await generateOtp();

    const isOtpExist = await Otp.findOne({ otp, email });

    if (isOtpExist) {
        await isOtpExist.deleteOne();
    }

    const otpSended = await Otp.create({
        otp: otp,
        email: email
    });

    if (!otpSended) {
        throw new ApiError(401, "Something went wrong while sending the otp");
    }

    await sendEmail("Otp For Uber", "",
        `
        <div>
        <p style="fontSize: "18px"; fontWeight: 600;> Your Otp For Creating Account on Uber is: <p/>
        <p style="fontSize: "32px"> ${otp} <p/>
        <p> This otp will expire in 1 hour </p>
        </div>
        `, email);
};

const register = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg);
    }

    const existedUser = await Driver.findOne({ email }) || await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(400, "Email Already in use");
    }

    await createOtp(email);

    return res.status(200).json(
        new ApiResponse(200, null, "Otp Sent to your Email")
    );
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const { email, fullName, password, phoneNumber } = req.body.driver || {};

    if (!otp || !email) {
        throw new ApiError(400, "OTP and Email are Required");
    }

    const otpExists = await Otp.findOne({ otp, email });

    if (!otpExists) {
        throw new ApiError(401, "Invalid OTP");
    }

    let driver = await Driver.findOne({ email });

    if (!driver) {
        if (!fullName || !password || !phoneNumber) {
            throw new ApiError(400, "Please Provide fullName, password, and phoneNumber for Registration");
        }

        driver = await Driver.create({
            email,
            fullName,
            phoneNumber,
            password,
        });

        await otpExists.deleteOne();

        const token = await generateTokenForCookies(driver);

        return res.status(201).cookie("token", token).json(
            new ApiResponse(201, "Driver Registered and Logged in Successfully", driver)
        );
    } else {
        await otpExists.deleteOne();

        const token = await generateTokenForCookies(driver);

        return res.status(200).cookie("token", token).json(
            new ApiResponse(200, "Driver Logged in Successfully", driver)
        );
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const driver = await Driver.findOne({ email });

    if (!driver) {
        throw new ApiError(400, "Invalid Email");
    }

    const isMatch = await driver.matchPassword(password);

    if (!isMatch) {
        throw new ApiError(400, "Invalid Password");
    }

    await createOtp(email);

    return res.status(200).json(
        new ApiResponse(200, driver, "Otp Sent Please Check your Email")
    );
});

const addDetails = asyncHandler(async (req, res) => {
    const { color, vehicalType, plate, capacity, profilePic } = req.body
    const driver = await Driver.findById(req.driver?._id)

    if (!driver) {
        throw new ApiError(404, "Driver not Found")
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg)
    }

    driver.vehical = {
        color,
        vehicalType,
        plate,
        capacity
    }
    driver.profilePic = profilePic

    await driver.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, driver, "Driver Details Updated")
    )
})

const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is Required");
    }

    await createOtp(email);

    return res.status(200).json(
        new ApiResponse(200, {}, "Otp Resent Successfully")
    );
});

const logout = asyncHandler(async (req, res) => {
    res.status(200).clearCookie('token').json(
        new ApiResponse(200, {}, "Driver logged out successfully")
    );
});

const getProfile = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.driver._id);

    if (!driver) {
        throw new ApiError(400, "Driver does not exist");
    }

    res.status(200).json(
        new ApiResponse(200, driver, "Driver profile fetched successfully")
    );
});

const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email, password, color, vehicalType, capacity, plate, profilePic } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array()[0].msg);
    }

    const driver = await Driver.findById(req.driver._id);

    if (!driver) {
        throw new ApiError(400, "Driver does not exist");
    }

    driver.fullName = fullName || driver.fullName;
    driver.email = email || driver.email;
    driver.password = password || driver.password;
    driver.vehical.color = color || driver.vehical.color;
    driver.vehical.vehicalType = vehicalType || driver.vehical.vehicalType;
    driver.vehical.capacity = capacity || driver.vehical.capacity;
    driver.vehical.plate = plate || driver.vehical.plate;
    driver.profilePic = profilePic || driver.profilePic;

    await driver.save();

    res.status(200).json(
        new ApiResponse(200, driver, "Driver profile updated successfully")
    );
});

export {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    addDetails,
    verifyOtp,
    resendOtp
};