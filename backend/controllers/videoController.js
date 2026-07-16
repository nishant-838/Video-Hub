const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");


exports.uploadAndCreateVideo = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail?.[0];

    const transcodeVideo = require("../utils/transcodeVideo");
    const generateThumbnail = require("../utils/generateThumbnail");

    // Generate thumbnail if user didn't upload one
    let thumbnailPath;

    if (thumbnailFile) {
      thumbnailPath = thumbnailFile.path;
    } else {
      thumbnailPath = await generateThumbnail(videoFile.path);
    }

    // Transcode video
    const [video720, video480, video360] = await Promise.all([
      transcodeVideo(videoFile.path, 720),
      transcodeVideo(videoFile.path, 480),
      transcodeVideo(videoFile.path, 360),
    ]);

    // Upload transcoded videos
    const [uploaded720, uploaded480, uploaded360] = await Promise.all([
      cloudinary.uploader.upload(video720, {
        resource_type: "video",
        folder: "Video-streaming/videos/720p",
      }),
      cloudinary.uploader.upload(video480, {
        resource_type: "video",
        folder: "Video-streaming/videos/480p",
      }),
      cloudinary.uploader.upload(video360, {
        resource_type: "video",
        folder: "Video-streaming/videos/360p",
      }),
    ]);

    // Upload original video
    const uploadedVideo = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: "video",
      folder: "Video-streaming/videos",
    });

    // Upload thumbnail
    const uploadedThumbnail = await cloudinary.uploader.upload(thumbnailPath, {
      resource_type: "image",
      folder: "Video-streaming/thumbnails",
    });

    // Save video
    const video = await Video.create({
      title,
      description,
      category,
      videoUrls: {
        original: uploadedVideo.secure_url,
        "720p": uploaded720.secure_url,
        "480p": uploaded480.secure_url,
        "360p": uploaded360.secure_url,
      },
      thumbnailUrl: uploadedThumbnail.secure_url,
      uploader: req.user.id,
    });

    // Cleanup
    try {
      await fs.unlink(video720);
      await fs.unlink(video480);
      await fs.unlink(video360);
      await fs.unlink(videoFile.path);
      await fs.unlink(thumbnailPath);
    } catch (err) {
      console.log("Cleanup Error:", err.message);
    }

    res.status(201).json(video);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("uploader", "username email");

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Video
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc:{views: 1}
      },
      {returnDocument:"after"}
    ).populate("uploader", "username email");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.searchVideos=async(req,res)=>{
  try{
    const query=req.query.query;

    const videos=await Video.find(
      {
        title:{
          $regex: query,
          $options: "i"
        }
      }).populate(
        "uploader",
        "username email"
      )
      res.status(200).json(videos);
    }catch(error){
      res.status(500).json({
        message:error.message
      });
    }
  }

exports.getMyVideos=async(req,res)=>{
  try{
    const videos=await Video.find({
      uploader:req.user.id
    });
    res.status(200).json(videos);
  }catch(error){
    console.log(error);
    res.status(500).json({
      message:error.message
    });
  }
};  

exports.updateVideo = async (req, res) => {
  try {

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Only owner can edit
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedVideo);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.deleteVideo = async (req, res) => {
  try {

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Only owner can delete
    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Video deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
