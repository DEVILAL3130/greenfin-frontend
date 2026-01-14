import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function SustainabilityStatsCard() {
  const [stats, setStats] = useState({
    carbonSavedKg: 0,
    paperSaved: 0,
    greenPoints: 0,
  });

  useEffect(() => {
    api.get("/admin/sustainability")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Sustainability API Error:", err);
      });
  }, []);

  return (
    <motion.div
      className="bg-green-50 p-5 rounded-lg shadow"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p>🌍 CO₂ Saved: {stats.carbonSavedKg} kg</p>
      <p>📄 Paper Saved: {stats.paperSaved} pages</p>
      <p>🌱 Green Points: {stats.greenPoints}</p>
    </motion.div>
  );
}
