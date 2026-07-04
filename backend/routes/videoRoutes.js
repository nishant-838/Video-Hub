const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload =require("../middleware/uploadMiddleware");
const {
  uploadAndCreateVideo,
  getAllVideos,
  getVideoById,
  searchVideos,
  getMyVideos,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    {name:"video",maxCount:1},
    {name:"thumbnail",maxCount:1}
  ]),
  uploadAndCreateVideo
);

router.get("/", getAllVideos);

router.get("/search",searchVideos);

router.get(
  "/my-uploads",
  authMiddleware,
  getMyVideos
);

router.put(
  "/:id",
  authMiddleware,
  updateVideo
);

router.delete(
  "/:id",
  authMiddleware,
  deleteVideo
);


router.get("/:id", getVideoById);


module.exports = router;