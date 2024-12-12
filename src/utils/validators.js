import {body} from "express-validator"

export const userValidations = {
    Register : [
        body('fullName').isLength({min: 3}).withMessage("Name must be at least 3 characters long"),
        body('email').isEmail().withMessage("Email is not Valid"),
        body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long")
    ],
}

export const driverValidations = {
    Register : [
        body('fullName').isLength({min: 3}).withMessage("Name must be at least 3 characters long"),
        body('email').isEmail().withMessage("Email is not Valid"),
        body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
        body('capacity').isLength({min: 1}).withMessage("Capacity must be atleast 1"),
        body('vehicalType').isIn(['bike', 'auto', 'car']).withMessage("Vehical Type must be either bike, auto or car"),
        body('plate').isLength({min: 3}).withMessage("Plate must be at least 8 characters long"),
        body('color').notEmpty().withMessage("Color is required")
    ]
}