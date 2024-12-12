import { User } from "../models/user.model.js";
import { Driver } from "../models/driver.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken"

const userAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        throw new ApiError(401, "Unauthorized Request")
    }

    const userId = jwt.decode(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: userId }) || await Driver.findOne({ _id: userId })

    if(!user) {
        throw new ApiError(404, "User not Found")
    }

    req.user = user

    next()
})

export {
    userAuth
}