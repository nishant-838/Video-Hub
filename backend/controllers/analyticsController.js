const mongoose = require("mongoose");
const Video = require("../models/Video");
const Like = require("../models/Like");

exports.getDashboardAnalytics = async (req, res) => {
  try {
    // Convert JWT id string to MongoDB ObjectId
    const userId = req.user.id;

    // ===========================
    // Total Videos
    // ===========================
    const totalVideos = await Video.countDocuments({
      uploader: userId,
    });

    // ===========================
    // Total Views
    // ===========================
    const viewsResult = await Video.aggregate([
      {
        $match: {
          uploader: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalViews: {
            $sum: "$views",
          },
        },
      },
    ]);

    const totalViews =
      viewsResult.length > 0
        ? viewsResult[0].totalViews
        : 0;

    // ===========================
    // Get Creator Videos
    // ===========================
    const videos = await Video.find({
      uploader: userId,
    }).select("_id");

    const videoIds = videos.map((video) => video._id);

    // ===========================
    // Total Likes
    // ===========================
    const totalLikes = await Like.countDocuments({
      video: {
        $in: videoIds,
      },
    });

    // ===========================
    // Most Viewed Video
    // ===========================
    const topVideo = await Video.findOne({
      uploader: userId,
    })
      .sort({ views: -1 })
      .populate("uploader", "username")
      .select(
        "title thumbnailUrl videoUrls views createdAt category uploader"
      );

    // ===========================
    // Latest Uploaded Video
    // ===========================
    const latestVideo = await Video.findOne({
      uploader: userId,
    })
      .sort({ createdAt: -1 })
      .populate("uploader", "username")
      .select(
        "title thumbnailUrl videoUrls views createdAt category uploader"
      );

    // ===========================
    // Response
    // ===========================
    res.status(200).json({
      success: true,

      analytics: {
        totalVideos,
        totalViews,
        totalLikes,
      },

      topVideo,

      latestVideo,
    });

  } catch (error) {
    console.error("Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard analytics",
    });
  }
};