import { useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../layouts/AuthLayout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", form);

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role); // ADMIN / USER
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ FORCE UI REFRESH (CRITICAL FIX)
      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login to GreenFin">
      {error && (
        <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          required
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </form>

      <p className="mt-6 text-sm text-center">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-green-600 cursor-pointer"
        >
          Register
        </span>
      </p>
    </AuthLayout>
  );
};

export default Login;
