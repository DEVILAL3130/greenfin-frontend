import { motion } from "framer-motion";

export default function GreenSummary() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-green-50 p-6 rounded-lg text-sm text-green-800"
    >
      <p>
        By choosing digital loans and paperless verification,
        you’ve helped reduce carbon emissions and preserve
        natural resources.
      </p>

      <p className="mt-2 font-medium">
        🌱 Keep lending green — every digital step matters.
      </p>
    </motion.div>
  );
}
