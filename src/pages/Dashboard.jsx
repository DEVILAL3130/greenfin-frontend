import { useEffect, useState } from "react";
import API from "../services/api";
import EmiSuccessModal from "../components/EmiSuccessModal";
import TransparentLoanMarketplace from "../components/TransparentLoanMarketplace";



export default function Dashboard() {
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payingEmiId, setPayingEmiId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ SAME ENDPOINT AS LOAN TRACKING
        const res = await API.get("/loans/tracking");

        // 🔥 THIS IS THE KEY FIX
        setLoan(res.data.activeLoan || null);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getNextEmi = (loan) =>
    loan.emis?.find((emi) => emi.status === "due");

  const handlePayEmi = async (emiId) => {
  if (!loan) return;

  try {
    setPayingEmiId(emiId);

    const res = await API.post("/emi/pay", {
      loanId: loan._id,
      emiId,
    });

    setLoan(res.data.loan);

    // 🎉 SHOW SUCCESS ANIMATION
    setShowSuccess(true);

    // Auto close after 2 sec
    setTimeout(() => setShowSuccess(false), 2000);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to pay EMI");
  } finally {
    setPayingEmiId(null);
  }
};


  if (loading)
    return <p className="p-6 text-gray-500">Loading dashboard...</p>;

  if (!loan)
    return <p className="p-6 text-gray-500">No active loans</p>;

  const nextEmi = getNextEmi(loan);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Active Loan</h1>

      <div className="bg-white p-5 rounded shadow max-w-md">
        <h3 className="font-semibold text-lg">
          {loan.loanType} Loan
        </h3>

        {nextEmi ? (
          <p className="mt-2 text-gray-700">
            Next EMI: ₹{nextEmi.amount}
            <br />
            Due on{" "}
            {new Date(nextEmi.dueDate).toLocaleDateString()}
          </p>
        ) : (
          <p className="mt-2 text-green-600 font-semibold">
            All EMIs Paid ✅
          </p>
        )}

        {nextEmi && (
          <button
            onClick={() => handlePayEmi(nextEmi._id)}
            disabled={payingEmiId === nextEmi._id}
            className={`mt-4 w-full px-4 py-2 rounded text-white ${
              payingEmiId === nextEmi._id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {payingEmiId === nextEmi._id ? "Paying..." : "Pay EMI"}
          </button>
        )}
        <EmiSuccessModal
         open={showSuccess}
          onClose={() => setShowSuccess(false)}
         />

      </div>
      <TransparentLoanMarketplace />
    </div>
  );
}
