import { useEffect, useState } from "react";
import API from "../services/api";

export default function TransparentLoanMarketplace() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await API.get("/marketplace/loans");
        setLoans(res.data.loans || []);
      } catch (err) {
        console.error("Marketplace fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedLoans = loans.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(loans.length / ITEMS_PER_PAGE);

  const riskColor = (risk) => {
    if (risk === "Low") return "text-green-600";
    if (risk === "Medium") return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) return <p className="p-6">Loading marketplace...</p>;
  if (!loans.length)
    return <p className="p-6 text-gray-500">No loans available</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Transparent Loan Marketplace
      </h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Borrower</th>
            <th className="p-2 border">Risk</th>
            <th className="p-2 border">ROI</th>
            <th className="p-2 border">Green Score</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedLoans.map((loan) => (
            <tr key={loan._id} className="text-center">
              <td className="p-2 border">{loan.borrowerName}</td>
              <td className={`p-2 border ${riskColor(loan.riskLevel)}`}>
                {loan.riskLevel}
              </td>
              <td className="p-2 border">{loan.roi}%</td>
              <td className="p-2 border">{loan.greenScore}</td>
              <td className="p-2 border">
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
