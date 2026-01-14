import { motion } from "framer-motion";
import GreenStatCard from "../components/GreenStatCard";
import GreenSummary from "../components/GreenSummary";

export default function GreenDashboard() {
  const stats = [
    { label: "CO₂ Saved", value: "28.6 kg", icon: "🌍" },
    { label: "Paper Avoided", value: "142 pages", icon: "📄" },
    { label: "Green Points", value: "920 pts", icon: "🌱" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-gray-800">
        Greener Lending Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <GreenStatCard key={s.label} {...s} />
        ))}
      </div>

      <GreenSummary />
    </motion.div>
  );
}
