import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function EmiSuccessModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-80 text-center shadow-xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center"
            >
              <CheckCircle size={64} className="text-green-600" />
            </motion.div>

            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              EMI Paid Successfully
            </h2>

            <p className="mt-1 text-gray-500 text-sm">
              Your payment has been recorded 🎉
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
