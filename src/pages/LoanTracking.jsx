import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";

import EmiCalendar from "../components/EmiCalendar";
import LoanProgress from "../components/LoanProgress";
import AlertsPanel from "../components/AlertsPanel";

export default function LoanTracking() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payingEmiId, setPayingEmiId] = useState(null); // Track loading EMI

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await API.get("/tracking"); // Loan tracking endpoint
        const loan = res.data;

        // Map EMI calendar with loanId included
        const emiCalendar = loan.activeLoan?.emis?.map((emi) => ({
          emiId: emi._id,
          loanId: loan.activeLoan._id,
          dueDate: emi.dueDate,
          status: emi.status,
          amount: emi.amount,
        })) || [];

        // Calculate repayment progress
        const totalEmis = emiCalendar.length;
        const paidEmis = emiCalendar.filter((e) => e.status === "paid").length;
        const repaymentProgress = totalEmis ? Math.round((paidEmis / totalEmis) * 100) : 0;

        setData({
          ...loan,
          emiCalendar,
          repaymentProgress,
        });
      } catch (err) {
        console.error("Loan tracking error", err);
        setError("Failed to load loan tracking");
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, []);

  // Handle Pay EMI
  const handlePayEmi = async (emiId) => {
    if (!data?.activeLoan) return;

    try {
      setPayingEmiId(emiId);

      const res = await API.post("/emi/pay", {
        loanId: data.activeLoan._id,
        emiId,
      });

      const loan = res.data.loan;

      // Update EMI calendar and progress
      const emiCalendar = loan.emis.map((emi) => ({
        emiId: emi._id,
        loanId: loan._id,
        dueDate: emi.dueDate,
        status: emi.status,
        amount: emi.amount,
      }));

      const totalEmis = emiCalendar.length;
      const paidEmis = emiCalendar.filter((e) => e.status === "paid").length;
      const repaymentProgress = totalEmis ? Math.round((paidEmis / totalEmis) * 100) : 0;

      setData({
        activeLoan: loan,
        emiCalendar,
        repaymentProgress,
        alerts: loan.alerts,
      });

      alert("EMI paid successfully!");
    } catch (err) {
      console.error("Pay EMI error:", err);
      alert(err.response?.data?.message || "Failed to pay EMI");
    } finally {
      setPayingEmiId(null);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading loan tracking...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!data?.activeLoan)
    return <p className="p-6 text-gray-500 text-lg">No active loan</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-gray-800">Loan Tracking</h1>

      <div className="grid grid-cols-3 gap-6">
        <LoanProgress progress={data.repaymentProgress ?? 0} />

        <EmiCalendar
          emiCalendar={data.emiCalendar ?? []}
          payingEmiId={payingEmiId}
          onPayEmi={handlePayEmi}
          loanId={data.activeLoan._id} // Pass loanId for receipt download
        />

        <AlertsPanel alerts={data.alerts ?? []} />
      </div>
    </motion.div>
  );
}
