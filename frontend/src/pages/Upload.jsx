import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  // Thumbnail preview
  useEffect(() => {
    if (thumbnail) {
      setThumbPreview(URL.createObjectURL(thumbnail));
    }
  }, [thumbnail]);

  // Video preview info
  useEffect(() => {
    if (video) {
      setVideoPreview({
        name: video.name,
        size: (video.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    }
  }, [video]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) return alert("Please select a video");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);

      await api.post("/videos/upload", formData);

      alert("🚀 Video Uploaded Successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setVideo(null);
      setThumbnail(null);
      setVideoPreview(null);
      setThumbPreview(null);
    } catch (error) {
      console.log(error);
      alert("❌ Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl transition-all duration-300 hover:shadow-2xl">

          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            🎬 Upload Your Video
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <input
              type="text"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />

            {/* THUMBNAIL */}
            <div>
  <p className="text-sm text-gray-600 mb-2">Thumbnail Image</p>

  <label className="block w-full h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:border-red-500 transition relative overflow-hidden">

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => setThumbnail(e.target.files[0])}
    />

    {thumbPreview ? (
      <img
        src={thumbPreview}
        className="w-full h-full object-scale-down"
        alt="thumbnail"
      />
    ) : (
      <span className="text-gray-400">
        📸 Click to upload thumbnail
      </span>
    )}

  </label>
</div>

            {/* DESCRIPTION */}
            <textarea
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg h-28 focus:ring-2 focus:ring-red-500 outline-none"
            />

            {/* CATEGORY */}
            <input
              type="text"
              placeholder="Category (e.g. Gaming, Tech...)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />

            {/* VIDEO */}
            <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-red-500 transition">

  <p className="text-sm text-gray-600 mb-2">Video File</p>

  <label className="cursor-pointer">

    <input
      type="file"
      accept="video/*"
      className="hidden"
      onChange={(e) => setVideo(e.target.files[0])}
    />

    <div className="text-gray-500">
      🎬 Click to upload video
    </div>

  </label>

  {video && (
    <div className="mt-3 text-sm text-gray-700 animate-pulse">
      <p>📄 {video.name}</p>
      <p>⚡ {(video.size / (1024 * 1024)).toFixed(2)} MB</p>
    </div>
  )}

</div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-3 rounded-lg hover:scale-[1.02] transition transform disabled:bg-gray-400"
            >
              {loading ? "Uploading..." : "🚀 Upload Now"}
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Upload;