import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function MyUploads() {

  const navigate = useNavigate();
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

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this video?"
  );

  if (!confirmDelete) return;

  try {

    await api.delete(`/videos/${id}`);

    setVideos(
      videos.filter((video) => video._id !== id)
    );

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
  <div key={video._id}>

    <VideoCard video={video} />

    <div className="flex gap-3 mt-3">

      <button
        onClick={() => navigate(`/edit-video/${video._id}`)}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        ✏️ Edit
      </button>

      <button
        onClick={() => handleDelete(video._id)}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
      >
        🗑 Delete
      </button>

    </div>

  </div>
))}

      </div>

    </Layout>
  );
}

export default MyUploads;