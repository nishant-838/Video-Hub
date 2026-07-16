const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function generateThumbnail(videoPath) {
  return new Promise((resolve, reject) => {
    const output = path.join(
      path.dirname(videoPath),
      `thumb-${Date.now()}.jpg`
    );

    ffmpeg(videoPath)
      .screenshots({
        timestamps: ["00:00:01"],
        filename: path.basename(output),
        folder: path.dirname(output),
        size: "1280x720",
      })
      .on("end", () => resolve(output))
      .on("error", reject);
  });
}

module.exports = generateThumbnail;