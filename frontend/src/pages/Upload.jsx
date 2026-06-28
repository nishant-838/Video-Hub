import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Upload() {

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] =
    useState("");
  const [video, setVideo] =
    useState(null);
  const [thumbnail,setThumbnail]=useState(null);

  const [loading, setLoading] =
    useState(false);



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!video) {
      alert("Please select a video");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append(
        "description",
        description
      );
      formData.append(
        "category",
        category
      );
      formData.append(
        "video",
        video
      );
      formData.append(
        "thumbnail",
        thumbnail
      );

      const res = await api.post(
        "/videos/upload",
        formData
      );

      console.log(res.data);

      alert("Video Uploaded Successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setVideo(null);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <Layout>

      <div className="flex justify-center mt-10">

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Upload Video
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Video Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>
                setThumbnail(e.target.files[0])
              }
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded h-32"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded"
            />

            <div className="border-2 border-dashed rounded-lg p-6 text-center">

              <p className="mb-3">
                Select Video File
              </p>

              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setVideo(
                    e.target.files[0]
                  )
                }
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 disabled:bg-gray-400"
            >

              {loading
                ? "Uploading..."
                : "Upload Video"}

            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
}

export default Upload;