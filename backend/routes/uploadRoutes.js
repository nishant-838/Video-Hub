const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadVideo,
} = require("../controllers/uploadController");

router.post(
  "/video",
  authMiddleware,
  upload.single("video"),
  uploadVideo
);

module.exports = router;