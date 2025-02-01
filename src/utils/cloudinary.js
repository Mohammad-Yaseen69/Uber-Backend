import { v2 as cloudinary } from "cloudinary"
import { ApiError } from "./apiError.js"
import fs from "fs"


cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const uploadImage = async (localPath) => {
    
    try {
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "image",
            folder: "Uber"
        })


        console.log("File Uploaded Successfully")
        fs.unlinkSync(localPath)

        return {
            ok: true,
            response
        }
    } catch (error) {
        fs.unlinkSync(localPath)
        console.log(error)
        throw new ApiError(500, "Something went wrong while uploading image, please try again")
        return {
            ok: false,
            error
        }
    }
}

const deleteImage = async (publicPath) => {
    try {
        const resposne = await cloudinary.uploader.destroy(publicPath, {
            resource_type: "image",
            folder: "Uber"
        })
        console.log("File Deleted Successfully")
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting image")
    }
}


export { uploadImage, deleteImage }