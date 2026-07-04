import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function LikedVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchLikedVideos();
  }, []);

  const fetchLikedVideos = async () => {
    try {
      const res = await api.get("/likes/my-likes");
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        ❤️ Liked Videos
      </h1>

      {videos.length === 0 ? (
        <p className="text-gray-500">
          You haven't liked any videos yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}

export default LikedVideos;