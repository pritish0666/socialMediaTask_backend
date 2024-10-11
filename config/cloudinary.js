const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;

    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
      folder: "user_uploads",
    });

    
    fs.unlinkSync(filepath);
    return response.secure_url; 
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(filepath);
    return null;
  }
};

module.exports = { uploadOnCloudinary }; 
