const Video = require("../models/Video");


exports.uploadAndCreateVideo = async (req, res) => {
  console.log("Controller reached");
  console.log(req.body);
  console.log(req.file);
  try {

    const {
      title,
      description,
      category
    } = req.body;

    const videoFile=req.files.video[0];
    const thumbnailFile=req.files.thumbnail[0];

    const video = await Video.create({
      title,
      description,
      category,
      videoUrl: videoFile.path,
      thumbnailUrl: thumbnailFile.path,
      uploader: req.user.id
    });

    res.status(201).json(video);

  } catch (error) {

    res.status(500).json({
      message: error.message
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
