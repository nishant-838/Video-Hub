import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function WatchLater() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchWatchLater();
  }, []);

  const fetchWatchLater = async () => {
    try {

      const res = await api.get(
        "/watch-later/my-watch-later"
      );

      setVideos(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        📌 Watch Later
      </h1>

      {
        videos.length === 0
        ? (
          <p>No videos saved.</p>
        )
        : (
          <div className="grid md:grid-cols-3 gap-6">

            {
              videos.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                />
              ))
            }

          </div>
        )
      }

    </Layout>
  );
}

export default WatchLater;