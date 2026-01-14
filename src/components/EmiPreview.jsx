import { motion } from "framer-motion";

export default function EmiPreview({ emi }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-gray-100 rounded-lg"
    >
      <p className="text-lg">
        Estimated EMI: <strong>₹{emi}</strong>
      </p>
    </motion.div>
  );
}
