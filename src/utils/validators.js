import {body} from "express-validator"

const userValidations = {
    Register : [
        body('fullName').isLength({min: 3}).withMessage("Name must be at least 3 characters long"),
        body('email').isEmail().withMessage("Email is not Valid"),
        body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long")
    ]
}


export {
    userValidations
}