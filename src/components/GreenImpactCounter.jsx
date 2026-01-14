import { motion } from "framer-motion";

export default function GreenImpactCounter({ label, value, unit }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="p-6 bg-green-50 rounded-lg text-center"
    >
      <p className="text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-green-700">
        {value} {unit}
      </p>
    </motion.div>
  );
}
