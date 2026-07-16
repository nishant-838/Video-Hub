import { formatDistanceToNow } from "date-fns";

// 👇 Add it here
const getThumbNail = (videoUrl) => {
  if (!videoUrl) return "https://placehold.co/640x360";
  return videoUrl
    .replace("/video/upload", "/video/upload/so_1/")
    .replace(".mp4", ".jpg");
};

function AnalyticsVideoCard({ title, video }) {
    console.log(video);
  if (!video) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500">No video found.</p>
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(
    new Date(video.createdAt),
    { addSuffix: true }
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-5">
        {title}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={video.thumbnailUrl || getThumbNail(video.videoUrls?.original)}
          alt={video.title}
          className="w-full md:w-80 h-48 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "https://placehold.co/640x360";
          }}
        />

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold">
              {video.title}
            </h3>

            <p className="text-gray-500 mt-2">
              Category: {video.category}
            </p>

          </div>

          <div className="mt-6 space-y-2">
            <p className="text-lg">
              👀 <span className="font-semibold">{video.views}</span> Views
            </p>

            <p className="text-gray-500">
              📅 {timeAgo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsVideoCard;