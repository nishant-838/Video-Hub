import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function MyUploads() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchMyVideos();
  }, []);

  const fetchMyVideos = async () => {
    try {
      const res = await api.get("/videos/my-uploads");
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await api.delete(`/videos/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">
          My Uploads
        </h1>

        {videos.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
             <p className="text-gray-500 font-medium">You haven't uploaded any videos yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <motion.div 
                key={video._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group"
              >
                <VideoCard video={video} />
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/edit-video/${video._id}`)}
                    className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm shadow-sm"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="flex-1 bg-white border border-red-100 text-red-600 py-2.5 rounded-xl hover:bg-red-50 transition-all font-semibold text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyUploads;