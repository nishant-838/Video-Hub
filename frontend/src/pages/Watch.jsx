import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Layout from "../components/Layout";
import api from "../services/api";

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [quality, setQuality] = useState("original");

  useEffect(() => {
    fetchVideo();
    fetchLikes();
    checkLiked();
    checkWatchLater();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await api.get(`/videos/${id}`);
      setVideo(res.data);
      await api.post("/history", { videoId: id });
    } catch (error) { console.log(error); }
  };

  const fetchLikes = async () => {
    try {
      const res = await api.get(`/likes/${id}`);
      setLikes(res.data.likes);
    } catch (error) { console.log(error); }
  };

  const checkLiked = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await api.get(`/likes/check/${id}`);
      setLiked(res.data.liked);
    } catch (error) { console.log(error); }
  };

  const toggleLike = async () => {
    try {
      const res = await api.post(`/likes/${id}`);
      setLiked(res.data.liked);
      fetchLikes();
    } catch (error) { console.log(error); }
  };

  const checkWatchLater = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await api.get(`/watch-later/check/${id}`);
      setSaved(res.data.saved);
    } catch (error) { console.log(error); }
  };

  const toggleWatchLater = async () => {
    try {
      const res = await api.post(`/watch-later/${id}`);
      setSaved(res.data.saved);
    } catch (error) { console.log(error); }
  };

  if (!video) return <div className="p-10 text-center">Loading...</div>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Video Player Section */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
          <video
            key={quality}
            controls
            className="w-full aspect-video"
            src={video.videoUrls[quality] ?? video.videoUrls.original}
          />
        </div>

        {/* Video Details */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
                {video.uploader?.username[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{video.uploader?.username}</p>
                <p className="text-sm text-gray-500">{video.views} views • {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleLike} className={`px-4 py-2 rounded-full font-medium transition-all ${liked ? "bg-red-100 text-red-600" : "bg-gray-100 hover:bg-gray-200"}`}>
                {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
              </button>
              <button onClick={toggleWatchLater} className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 font-medium transition-all">
                {saved ? "✅ Saved" : "📌 Watch Later"}
              </button>
            </div>
          </div>

          {/* Description & Quality Control */}
          <div className="mt-6 bg-gray-50 p-5 rounded-xl">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Description</h3>
                <select value={quality} onChange={(e) => setQuality(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none">
                  {Object.keys(video.videoUrls).map((q) => <option key={q} value={q}>{q.toUpperCase()}</option>)}
                </select>
             </div>
             <p className="text-gray-700 leading-relaxed">{video.description}</p>
             <span className="inline-block mt-4 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-500">
               {video.category}
             </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Watch;