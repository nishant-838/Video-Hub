const Like=require("../models/Like");

exports.toggleLike=async(req,res)=>{
    try{
        const {videoId}=req.params;
        const existingLike=await Like.findOne({
            user:req.user.id,
            video:videoId,
        });
        if(existingLike){
            await Like.findByIdAndDelete(
                existingLike._id
            );
            return res.status(200).json({
                liked:false,
            })
        }
        await Like.create({
            user:req.user.id,
            video:videoId,
        });
        res.status(201).json({
            liked:true,
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

exports.getLikeCount=async(req,res)=>{
    try{
        const count=await Like.countDocuments({
            video:req.params.videoId,
        })
        res.status(200).json({
            likes:count,
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

exports.checkLiked=async(req,res)=>{
    try{
        const like=await Like.findOne({
            user:req.user.id,
            video:req.params.videoId,
        })
        res.status(200).json({
            liked:!!like,
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

exports.getLikedVideos = async (req, res) => {
  try {

    const likes = await Like.find({
      user: req.user.id
    }).populate({
      path: "video",
      populate: {
        path: "uploader",
        select: "username"
      }
    });

    const videos = likes.map(
      (like) => like.video
    );

    res.status(200).json(videos);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};