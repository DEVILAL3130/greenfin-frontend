import { useEffect, useState } from "react";
import api from "../services/api";

export default function LoanApprovalTable() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await api.get("/admin/loans"); // JWT automatically attached in api.jsx
        setLoans(res.data);
      } catch (err) {
        console.error("Failed to fetch loans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const updateStatus = async (loanId, status) => {
    try {
      await api.post(`/admin/loans/${loanId}`, { status });
      setLoans((prev) =>
        prev.map((loan) =>
          loan._id === loanId ? { ...loan, status } : loan
        )
      );
    } catch (err) {
      console.error("Failed to update loan status:", err);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading loans...</p>;
  if (!loans.length) return <p>No pending loans found.</p>;

  return (
    <table className="w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">User</th>
          <th className="border p-2">Loan Type</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Risk Score</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan._id}>
            <td className="border p-2">{loan.user?.name || "N/A"}</td>
            <td className="border p-2">{loan.loanType}</td>
            <td className="border p-2">₹{loan.amount}</td>
            <td className="border p-2">{loan.riskScore}</td>
            <td className="border p-2">{loan.status}</td>
            <td className="border p-2 space-x-2">
              {loan.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateStatus(loan._id, "APPROVED")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(loan._id, "REJECTED")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

