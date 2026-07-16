import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      {/* Animated Glowing Wrapper */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-[2px] rounded-[32px] bg-gradient-to-tr from-red-500 via-purple-500 to-red-500 shadow-[0_0_50px_-12px_rgba(239,68,68,0.5)] w-full max-w-lg"
      >
        <div className="bg-gray-950 rounded-[30px] p-8 text-white">
          <div className="flex justify-center mb-6">
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-6xl"
            >
              🧙‍♂️
            </motion.div>
          </div>

          <h1 className="text-3xl font-black text-center mb-2">Create Account</h1>
          <p className="text-gray-400 text-center mb-8">Join VideoHub today.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="username" placeholder="Username" onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition" />
            <input name="email" type="email" placeholder="Email address" onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition" />
            
            <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-purple-600 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
              Register
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-red-400 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;