import LoanTable from "../components/LoanTable";

export default function Marketplace() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Transparent Loan Marketplace
      </h1>

      <LoanTable />
    </div>
  );
}
