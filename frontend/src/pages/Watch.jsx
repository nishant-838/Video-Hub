import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";

function Watch() {

  const { id } = useParams();

  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, []);

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

  if (!video) {
    return <h1>Loading...</h1>;
  }

  return (
  <Layout>

    <h1 className="text-3xl font-bold mb-4">
      {video.title}
    </h1>

    <p className="text-gray-500 mt-2">
      {video.views} views
    </p>

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