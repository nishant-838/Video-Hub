const WatchLater = require("../models/WatchLater");

exports.toggleWatchLater = async (req, res) => {
  try {

    const { videoId } = req.params;

    const existing = await WatchLater.findOne({
      user: req.user.id,
      video: videoId,
    });

    if (existing) {

      await WatchLater.findByIdAndDelete(
        existing._id
      );

      return res.status(200).json({
        saved: false,
      });

    }

    await WatchLater.create({
      user: req.user.id,
      video: videoId,
    });

    res.status(201).json({
      saved: true,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getWatchLaterVideos = async (req, res) => {
  try {

    const watchLater = await WatchLater.find({
      user: req.user.id
    }).populate({
      path: "video",
      populate: {
        path: "uploader",
        select: "username"
      }
    });

    const videos = watchLater.map(
      (item) => item.video
    );

    res.status(200).json(videos);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.checkWatchLater = async (req, res) => {
  try {

    const watchLater = await WatchLater.findOne({
      user: req.user.id,
      video: req.params.videoId,
    });

    res.status(200).json({
      saved: !!watchLater,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};