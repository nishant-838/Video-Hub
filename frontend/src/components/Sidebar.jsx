import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Sidebar() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.aside 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-64 bg-white border-r border-gray-100 min-h-screen p-6"
    >
      <motion.h2 variants={itemVariants} className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
        Menu
      </motion.h2>

      <nav className="flex flex-col gap-1">
        {[
          { to: "/", label: "Home", icon: "🏠" },
          { to: "/my-uploads", label: "My Uploads", icon: "🎥" },
          { to: "/history", label: "History", icon: "🕒" },
          { to: "/watch-later", label: "Watch Later", icon: "📌" },
          { to: "/analytics", label: "Analytics", icon: "📊" },
          { to: "/liked-videos", label: "Liked Videos", icon: "❤️" },
        ].map((item) => (
          <motion.div key={item.to} variants={itemVariants}>
            <Link
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700"
            >
              <span>{item.icon}</span> {item.label}
            </Link>
          </motion.div>
        ))}

        <hr className="my-6 border-gray-100" />

        <motion.h3 variants={itemVariants} className="font-semibold text-gray-400 text-sm mb-2 px-3">
          Categories
        </motion.h3>

        {["Education", "Gaming", "Music", "Technology", "Creativity"].map((cat) => (
          <motion.button 
            key={cat}
            variants={itemVariants}
            className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700"
          >
            {cat}
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;