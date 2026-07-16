const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const transcodeVideo = (inputPath, resolution) => {

  return new Promise((resolve, reject) => {

    const outputPath = path.join(
      path.dirname(inputPath),
      `${path.parse(inputPath).name}-${resolution}.mp4`
    );

    ffmpeg(inputPath)
      .size(`?x${resolution}`)
      .videoCodec("libx264")
      .audioCodec("aac")
      .output(outputPath)
      .on("end", () => {

        console.log(`${resolution}p Finished`);

        resolve(outputPath);

      })
      .on("error", reject)
      .run();

  });

};

module.exports = transcodeVideo;