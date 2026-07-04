const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  toggleWatchLater,
  getWatchLaterVideos,
  checkWatchLater,
} = require("../controllers/watchLaterController");

const router = express.Router();

router.get(
  "/my-watch-later",
  authMiddleware,
  getWatchLaterVideos
);

router.get(
  "/check/:videoId",
  authMiddleware,
  checkWatchLater
);

router.post(
  "/:videoId",
  authMiddleware,
  toggleWatchLater
);

module.exports = router;