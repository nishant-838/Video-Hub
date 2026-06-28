import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";

function SearchResults() {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await api.get(
        `/videos/search?query=${query}`
      );

      setVideos(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{query}"
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

export default SearchResults;