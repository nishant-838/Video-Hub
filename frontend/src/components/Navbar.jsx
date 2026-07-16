import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/20 bg-white/70 backdrop-blur-2xl shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-gray-800 tracking-tighter">
          Video<span className="text-red-600">Hub</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-10">
          <input
            type="text"
            placeholder="Search amazing videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full px-5 py-2.5 rounded-l-full bg-gray-100 border-none outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-800 text-white px-6 rounded-r-full hover:bg-gray-900 transition-colors"
          >
            🔍
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to="/upload" className="bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 transition-all shadow-md">
                + Upload
              </Link>
              <span className="text-sm font-medium text-gray-600">Hi, {user?.username}</span>
              <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 font-medium transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 font-medium hover:text-red-600">Login</Link>
              <Link to="/register" className="bg-gray-800 px-5 py-2 rounded-full text-white font-medium hover:bg-black transition-all">Register</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;