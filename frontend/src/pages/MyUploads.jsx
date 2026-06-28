import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function MyUploads() {

  const [videos, setVideos] =
    useState([]);

  useEffect(() => {
    fetchMyVideos();
  }, []);

  const fetchMyVideos = async () => {
    try {

      const res = await api.get(
        "/videos/my-uploads"
      );

      setVideos(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        My Uploads
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

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

export default MyUploads;