const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  toggleLike,
  getLikeCount,
  checkLiked,
  getLikedVideos,
} = require("../controllers/likeController");

const router = express.Router();

router.get(
  "/my-likes",
  authMiddleware,
  getLikedVideos
);

router.get(
  "/check/:videoId",
  authMiddleware,
  checkLiked
);

router.post(
  "/:videoId",
  authMiddleware,
  toggleLike
);

router.get(
  "/:videoId",
  getLikeCount
);



module.exports = router;