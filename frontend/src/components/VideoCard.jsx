import { Link } from "react-router-dom";

const getThumbNail=(videoUrl)=>{
  if(!videoUrl){
    return "https://placehold.co/640x360";
  }
  return videoUrl.replace("/video/upload","/video/upload/so_1/").replace(".mp4",".jpg",".jpeg");
};

function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`}>

      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300">

        <img
          src={video.thumbnailUrl?video.thumbnailUrl:getThumbNail(video.videoUrl)}
          alt={video.title}
          className="w-full h-48 object-cover"
          onError={(e)=>{
            e.target.src="https://placehold.co/640x360"
          }}
        />

        <div className="p-4">

          <h2 className="font-semibold text-lg line-clamp-2">
            {video.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {video.uploader?.username}
          </p>

          <div className="flex justify-between mt-2 text-sm text-gray-500">

            <span>{video.category}</span>

            <span>
              {video.views} views
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default VideoCard;