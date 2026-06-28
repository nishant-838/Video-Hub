import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/");

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <Layout>

      <div className="flex justify-center mt-10">

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-6">
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button
              className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-4">

            Don't have an account?

            <Link
              className="text-red-600 ml-1"
              to="/register"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </Layout>
  );
}

export default Login;