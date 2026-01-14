import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../services/api";
import LoanTypeCard from "../components/LoanTypeCard";
import EmiPreview from "../components/EmiPreview";
import StepIndicator from "../components/StepIndicator";
import UploadDropzone from "../components/UploadDropzone";

const steps = ["Loan Type", "Details", "Review"];

export default function ApplyLoan() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loanId, setLoanId] = useState(null); // ✅ IMPORTANT

  const [form, setForm] = useState({
    loanType: "",
    amount: 100000,
    tenure: 12,
  });

  const interestRates = {
    PERSONAL: 12,
    EDUCATION: 8,
    GREEN: 6,
  };

  const emi = useMemo(() => {
    if (!form.loanType) return 0;
    const r = interestRates[form.loanType] / 12 / 100;
    const n = form.tenure;
    const p = form.amount;
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [form]);

  // ✅ APPLY LOAN + GET loanId
  const submitLoan = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/loans/apply",
        {
          loanType: form.loanType,
          amount: form.amount,
          tenureMonths: form.tenure,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ STORE LOAN ID
      setLoanId(res.data.loan._id);

      alert("Loan Application Submitted ✅\nNow upload documents");
    } catch (error) {
      console.error("Loan submission error:", error.response?.data || error);
      alert("Submission Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <StepIndicator step={step} steps={steps} />

      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {step === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <h2 className="text-2xl mb-6">Select Loan Type</h2>

            <div className="grid grid-cols-3 gap-6">
              {["PERSONAL", "EDUCATION", "GREEN"].map((type) => (
                <LoanTypeCard
                  key={type}
                  type={type}
                  selected={form.loanType === type}
                  onClick={() => setForm({ ...form, loanType: type })}
                />
              ))}
            </div>

            <button
              disabled={!form.loanType}
              onClick={() => setStep(1)}
              className="mt-8 btn-primary"
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <h2 className="text-2xl mb-6">Loan Details</h2>

            <label>Amount: ₹{form.amount}</label>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={5000}
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: +e.target.value })
              }
              className="w-full mb-6"
            />

            <label>Tenure: {form.tenure} months</label>
            <input
              type="range"
              min={6}
              max={60}
              value={form.tenure}
              onChange={(e) =>
                setForm({ ...form, tenure: +e.target.value })
              }
              className="w-full mb-6"
            />

            <EmiPreview emi={emi} />

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(0)}>← Back</button>
              <button onClick={() => setStep(2)} className="btn-primary">
                Review →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl mb-6">Review & Submit</h2>

            <ul className="space-y-2">
              <li>Loan Type: {form.loanType}</li>
              <li>Amount: ₹{form.amount}</li>
              <li>Tenure: {form.tenure} months</li>
              <li className="font-bold">EMI: ₹{emi}</li>
            </ul>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={submitLoan}
              disabled={loading}
              className="btn-primary mt-8"
            >
              {loading ? "Submitting..." : "Submit Loan"}
            </motion.button>

            {/* ✅ DOCUMENT UPLOAD AFTER LOAN */}
            {loanId && (
              <div className="mt-10">
                <h3 className="text-xl mb-4 font-semibold">
                  Upload Loan Documents
                </h3>

                <UploadDropzone
                  loanId={loanId}
                  onUploadSuccess={() => {}}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
