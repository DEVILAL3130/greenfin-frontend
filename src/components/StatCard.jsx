import { motion } from "framer-motion";

const StatCard = ({ title, value, subtitle }) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm"
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default StatCard;
