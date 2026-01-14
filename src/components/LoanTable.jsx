import { useState } from "react";
import LoanRow from "./LoanRow";
import Pagination from "./Pagination";

const loans = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  borrower: `Borrower ${i + 1}`,
  risk: ["Low", "Medium", "High"][i % 3],
  roi: `${8 + i % 5}%`,
  greenScore: 70 + (i % 20),
}));

export default function LoanTable() {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const paginated = loans.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Borrower</th>
            <th className="p-3">Risk</th>
            <th className="p-3">ROI</th>
            <th className="p-3">Green Score</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((loan) => (
            <LoanRow key={loan.id} loan={loan} />
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        total={loans.length}
        perPage={perPage}
        onChange={setPage}
      />
    </div>
  );
}
