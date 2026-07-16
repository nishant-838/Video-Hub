import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Container animation for the grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Individual item animation
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Trending Videos</h1>
        <p className="text-gray-500 mt-1">Explore the latest content from our creators.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {videos.map((video) => (
            <motion.div key={video._id} variants={item}>
              <VideoCard video={video} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Layout>
  );
}

export default Home;