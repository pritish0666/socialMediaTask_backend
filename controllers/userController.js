const User = require("../models/User");
const { uploadOnCloudinary } = require("../config/cloudinary");

const getUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { getUsers };


const handleUserSubmission = async (req, res) => {
  try {
    const { name, handle } = req.body;

    if (!name || !handle) {
      return res.status(400).json({ message: "Name and handle are required" });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      // Upload each image to Cloudinary
      for (const file of req.files) {
        const imageUrl = await uploadOnCloudinary(file.path);
        if (imageUrl) {
          imageUrls.push(imageUrl);
        } else {
          return res.status(500).json({ message: "Image upload failed" });
        }
      }
    } else {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    
    const user = await User.create({
      name,
      handle,
      images: imageUrls, 
    });

    return res
      .status(201)
      .json({ message: "User submitted successfully", user });
  } catch (error) {
    console.error("Error handling submission:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleUserSubmission, getUsers };
