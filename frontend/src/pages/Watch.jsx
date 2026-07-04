import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Layout from "../components/Layout";
import api from "../services/api";

function Watch() {

  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [likes,setLikes] = useState(0);
  const [liked,setLiked] =useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
  fetchVideo();
  fetchLikes();
  checkLiked();
  checkWatchLater();
}, [id]);

  const fetchVideo = async () => {
    try {

      const res = await api.get(
        `/videos/${id}`
      );

      console.log(res.data);

      setVideo(res.data);

      await api.post(
        "/history",
        {
          videoId:id
        }
      );

    } catch (error) {

      console.log(error);

    }
  };

  const fetchLikes=async()=>{
    try{
      const res=await api.get(`/likes/${id}`);
      setLikes(res.data.likes);
    }catch(error){
      console.log(error);
    }
  }

  const checkLiked = async () => {
  try {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    const res = await api.get(
      `/likes/check/${id}`
    );

    setLiked(res.data.liked);

  } catch (error) {

    console.log(error);

  }
  };

  const toggleLike=async()=>{
    try{
      const res=await api.post(`/likes/${id}`);
      setLiked(res.data.liked);
      fetchLikes();
    }catch (error) {
      console.log(error);
    }
  }

  const checkWatchLater = async () => {
  try {

    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await api.get(
      `/watch-later/check/${id}`
    );

    setSaved(res.data.saved);

  } catch (error) {
    console.log(error);
  }
  };

  const toggleWatchLater = async () => {
  try {

    const res = await api.post(
      `/watch-later/${id}`
    );

    setSaved(res.data.saved);

  } catch (error) {
    console.log(error);
  }
  };

  if (!video) {
    return <h1>Loading...</h1>;
  }

  return (
  <Layout>

    <h1 className="text-3xl font-bold mb-4">
      {video.title}
    </h1>

    <div className="flex items-center gap-3 text-gray-500 mt-2">

      <span>
        {video.views} views
      </span>

      <span>•</span>

      <span>
        {formatDistanceToNow(
          new Date(video.createdAt),
          { addSuffix: true }
        )}
      </span>

    </div>

  <div className="mt-4 flex gap-4">
    <button
      onClick={toggleLike}
      className="bg-red-500 text-white px-4 py-2 rounded-lg">
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>

    <button
      onClick={toggleWatchLater}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg">
      {saved ? "✅ Saved" : "📌 Watch Later"}
    </button>

    <p className="mt-2 text-gray-600">
      {likes} Likes
    </p>

  </div>

    <p className="mt-3 font-semibold">
        {video.uploader?.username}
    </p>

    <video
      controls
      className="w-full rounded"
      src={video.videoUrl}
    />

    <div className="mt-4">

      <p>
        {video.description}
      </p>

      <p className="mt-2 text-gray-500">
        {video.category}
      </p>

      <p className="mt-2">
        Uploaded by:
        {" "}
        {video.uploader?.username}
      </p>

    </div>

  </Layout>
);
}

export default Watch;