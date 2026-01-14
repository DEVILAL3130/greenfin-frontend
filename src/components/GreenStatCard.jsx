import { motion } from "framer-motion";

export default function GreenStatCard({ label, value, icon }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-5 rounded-lg shadow"
    >
      <div className="text-3xl">{icon}</div>
      <p className="text-sm text-gray-500 mt-2">{label}</p>
      <p className="text-2xl font-semibold text-green-600">
        {value}
      </p>
    </motion.div>
  );
}
