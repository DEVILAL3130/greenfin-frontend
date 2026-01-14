import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoanRow({ loan }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="border-t">
        <td className="p-3">{loan.borrower}</td>
        <td className="p-3">{loan.risk}</td>
        <td className="p-3">{loan.roi}</td>
        <td className="p-3">{loan.greenScore}</td>
        <td className="p-3">
          <button
            onClick={() => setOpen(!open)}
            className="text-green-600 hover:underline"
          >
            View
          </button>
        </td>
      </tr>

      <AnimatePresence>
        {open && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <td colSpan="5" className="p-4 bg-green-50 text-sm">
              <p>
                📊 Risk Score: <strong>{loan.risk}</strong>
              </p>
              <p>
                🌱 Green Impact Score:{" "}
                <strong>{loan.greenScore}/100</strong>
              </p>
              <p>
                💰 Expected ROI: <strong>{loan.roi}</strong>
              </p>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}
