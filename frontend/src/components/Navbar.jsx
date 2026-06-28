import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [searchTerm,setSearchTerm]=useState("");

  const handleSearch=()=>{
    if(!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    // The "Glass" container
    <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/20 bg-gradient-to-r from-red-600/60 to-purple-700/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo with a glow effect */}
        <Link to="/" className="text-2xl font-black text-white tracking-tighter drop-shadow-lg">
          Video<span className="text-yellow-300">Hub</span>
        </Link>

        {/* Search Bar */}
      <div className="hidden md:flex flex-1 mx-10">

  <input
    type="text"
    placeholder="Search amazing videos..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    }}
    className="w-full px-5 py-2 rounded-l-full border-none outline-none bg-white/10 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20 transition-all border border-white/10"
  />

  <button
    onClick={handleSearch}
    className="bg-white/20 text-white px-6 rounded-r-full hover:bg-white/30 backdrop-blur-sm border-l-0 border border-white/10"
  >
    🔍
  </button>

</div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {token && (
            <Link
              to="/upload"
              className="bg-yellow-400 text-red-900 px-5 py-2 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              + Upload
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="text-white font-medium hover:text-yellow-200 transition-colors">Login</Link>
              <Link to="/register" className="bg-black/20 px-5 py-2 rounded-full text-white font-medium hover:bg-black/30 backdrop-blur-sm transition-all border border-white/10">Register</Link>
            </>
          ) : (
            <>
              <span className="font-semibold text-white bg-black/10 px-3 py-1 rounded-full text-sm">
                Hi, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-900/40 text-white px-5 py-2 rounded-full hover:bg-red-900/60 backdrop-blur-sm transition-all border border-white/10"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;