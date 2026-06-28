const History = require("../models/History");

exports.addToHistory = async (
  req,
  res
) => {
  try {

    const { videoId } = req.body;

    const existing =
      await History.findOne({
        user: req.user.id,
        video: videoId
      });

    if (existing) {

      existing.watchedAt =
        new Date();

      await existing.save();

      return res.status(200).json({
        message:
          "History updated"
      });
    }

    await History.create({
      user: req.user.id,
      video: videoId
    });

    res.status(201).json({
      message:
        "Added to history"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getHistory = async (
  req,
  res
) => {
  try {

    const history =
      await History.find({
        user: req.user.id
      })
        .populate("video")
        .sort({
          watchedAt: -1
        });

    res.status(200).json(
      history
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};