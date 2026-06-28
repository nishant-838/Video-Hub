import { useEffect, useState } from "react";

import api from "../services/api";

import Layout from "../components/Layout";

import VideoCard from "../components/VideoCard";

function Home() {

  const [videos, setVideos] =
    useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {

    const res =
      await api.get("/videos");

    setVideos(res.data);
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        All Videos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}

      </div>

    </Layout>
  );
}

export default Home;