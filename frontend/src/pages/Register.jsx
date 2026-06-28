import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      await api.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center mt-10">

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-6">
            Register
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

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
              type="submit"
              className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-4">

            Already have an account?

            <Link
              to="/login"
              className="text-red-600 ml-1"
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </Layout>
  );
}

export default Register;