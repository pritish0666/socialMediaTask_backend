const express = require("express");
const router = express.Router();
const { handleUserSubmission,getUsers } = require("../controllers/userController");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });


router.post("/", upload.array("images", 10), handleUserSubmission);
router.get("/users", getUsers);

module.exports = router;
