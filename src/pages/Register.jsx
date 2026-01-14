import { useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../layouts/AuthLayout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Send registration request
      const { data } = await api.post("/auth/register", form);

      // ✅ Save token, role, and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Navigate directly to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create GreenFin Account">
      {error && (
        <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded focus:ring-1 focus:ring-green-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded focus:ring-1 focus:ring-green-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded focus:ring-1 focus:ring-green-500"
          required
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Register"}
        </motion.button>
      </form>

      <p className="mt-6 text-sm text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="text-green-600 cursor-pointer"
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
};

export default Register;
