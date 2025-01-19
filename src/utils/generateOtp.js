import { Otp } from "../models/otp.model.js";

export const generateOtp = async () => {
  let otp;
  let otpExists = true;

  while (otpExists) {
    otp = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit OTP
    otpExists = await Otp.exists({ otp }); // Check if OTP already exists in the database
  }

  return otp;
};