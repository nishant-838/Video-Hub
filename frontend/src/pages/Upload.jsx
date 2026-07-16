import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { motion } from "framer-motion";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!thumbnail) return;
    const url = URL.createObjectURL(thumbnail);
    setThumbPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnail]);

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
      if (thumbnail) formData.append("thumbnail", thumbnail);
      await api.post("/videos/upload", formData);
      alert("🚀 Video Uploaded Successfully");
      // Reset state...
    } catch (error) {
      console.log(error);
      alert("❌ Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mt-10"
      >
        <div className="bg-white/50 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8">
          <h1 className="text-3xl font-black text-gray-800 mb-8 text-center tracking-tight">
            Upload Content
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Video Title</label>
              <input
                type="text"
                placeholder="What's your video about?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 outline-none transition"
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Thumbnail</label>
              <label className="block w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-red-400 transition group">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setThumbnail(e.target.files[0])} />
                {thumbPreview ? (
                  <img src={thumbPreview} className="w-full h-full object-cover rounded-2xl" alt="preview" />
                ) : (
                  <span className="text-gray-400 group-hover:text-red-400 transition">📸 Click to set thumbnail</span>
                )}
              </label>
            </div>

            {/* Description & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="md:col-span-2">
                 <label className="block text-sm font-semibold text-gray-600 mb-2">Description</label>
                 <textarea placeholder="Tell your audience more..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 h-28 outline-none focus:ring-2 focus:ring-red-500/20" />
               </div>
               <div className="md:col-span-2">
                 <input type="text" placeholder="Category (e.g., Gaming)" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-red-500/20" />
               </div>
            </div>

            {/* Video File */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Video File</p>
                {video ? <p className="text-xs text-red-600 font-bold mt-1 truncate max-w-[200px]">{video.name}</p> : <p className="text-xs text-gray-400">No file selected</p>}
              </div>
              <label className="bg-white border border-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition text-sm">
                Choose File
                <input type="file" accept="video/*" className="hidden" onChange={(e) => setVideo(e.target.files[0])} />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98]"
            >
              {loading ? "Processing..." : "Publish Video"}
            </button>
          </form>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Upload;