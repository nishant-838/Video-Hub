import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">

      <h2 className="text-lg font-bold mb-6">
        Menu
      </h2>

      <nav className="flex flex-col gap-3">

        <Link
          to="/"
          className="p-3 rounded hover:bg-gray-100"
        >
          🏠 Home
        </Link>

        <Link
          to="/my-uploads"
          className="p-3 rounded hover:bg-gray-100"
        >
          🎥 My Uploads
        </Link>

        <Link
          to="/history"
          className="p-3 rounded hover:bg-gray-100"
        >
          🕒 History
        </Link>

        <Link
          to="/watch-later"
          className="p-3 rounded hover:bg-gray-100"
        >
          📌 Watch Later
        </Link>

        <Link
          to="/liked-videos"
          className="p-3 rounded hover:bg-gray-100"
        >
          ❤️ Liked Videos
        </Link>

        <hr />

        <h3 className="font-semibold text-gray-600">
          Categories
        </h3>

        <button className="text-left p-2 rounded hover:bg-gray-100">
          🎓 Education
        </button>

        <button className="text-left p-2 rounded hover:bg-gray-100">
          🎮 Gaming
        </button>

        <button className="text-left p-2 rounded hover:bg-gray-100">
          🎵 Music
        </button>

        <button className="text-left p-2 rounded hover:bg-gray-100">
          💻 Technology
        </button>

        <button className="text-left p-2 rounded hover:bg-gray-100">
         🤺Creativity
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;