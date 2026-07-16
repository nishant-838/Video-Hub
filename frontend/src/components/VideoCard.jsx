import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const getThumbNail = (videoUrl) => {
  if (!videoUrl) return "https://placehold.co/640x360";
  return videoUrl.replace("/video/upload", "/video/upload/so_1/").replace(".mp4", ".jpg");
};

const getTimeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true });

function VideoCard({ video }) {
  if (!video?._id) return null;

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <Link to={`/watch/${video._id}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <img
          src={video.thumbnailUrl || getThumbNail(video.videoUrls?.original)}
          alt={video.title}
          className="w-full h-48 object-cover"
          onError={(e) => (e.target.src = "https://placehold.co/640x360")}
        />

        <div className="p-4" style={{ transform: "translateZ(20px)" }}>
          <h2 className="font-semibold text-lg line-clamp-2">{video.title}</h2>
          <p className="text-gray-600 mt-2">{video.uploader?.username}</p>
          <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{getTimeAgo(video.createdAt)}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default VideoCard;