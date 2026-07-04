import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";

function EditVideo() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {

      const res = await api.get(`/videos/${id}`);

      setTitle(res.data.title);
      setDescription(res.data.description);
      setCategory(res.data.category);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/videos/${id}`, {
        title,
        description,
        category,
      });

      alert("Video updated successfully!");

      navigate("/my-uploads");

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Layout>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Edit Video
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg h-36"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Update Video
          </button>

        </form>

      </div>

    </Layout>
  );

}

export default EditVideo;