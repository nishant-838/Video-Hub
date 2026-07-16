const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    videoUrls: {
      original: {
    type: String,
    required: true,
  },
  "720p": {
    type: String,
    required: true,
  },
  "480p": {
    type: String,
    required: true,
  },
  "360p": {
    type: String,
    required: true,
  },
},

    thumbnailUrl: {
      type: String,
      default: "",
    },

    views: {
      type: Number,
      default: 0,
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);