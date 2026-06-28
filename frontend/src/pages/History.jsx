import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {

      const res = await api.get("/history");

      setHistory(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Watch History
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {history.map((item) => (
          <VideoCard
            key={item._id}
            video={item.video}
          />
        ))}

      </div>

    </Layout>
  );
}

export default History;