import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      {/* Animated Glowing Wrapper */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative p-[2px] rounded-[32px] bg-gradient-to-tr from-red-500 via-purple-500 to-red-500 shadow-[0_0_50px_-12px_rgba(239,68,68,0.5)]"
      >
        <div className="bg-gray-950 rounded-[30px] p-8 w-full max-w-md text-white">
          <h1 className="text-3xl font-black text-center mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-center mb-8">Sign in to continue to VideoHub</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-red-500 transition"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
            >
              SIGN IN
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link className="text-red-400 font-bold hover:underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;