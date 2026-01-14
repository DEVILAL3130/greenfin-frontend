import { motion } from "framer-motion";
import AdminLayout from "../layouts/AdminLayout";
import LoanApprovalTable from "../components/LoanApprovalTable";
import DocumentVerificationTable from "../components/DocumentVerificationTable";
import SustainabilityStatsCard from "../components/SustainabilityStatsCard";

export default function AdminDashboard() {
  return (
    <AdminLayout>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-semibold text-gray-800">
        Admin Panel
      </h1>

      {/* Sustainability stats */}
      <div className="grid grid-cols-3 gap-6">
        <SustainabilityStatsCard />
      </div>

      {/* Loan approvals */}
      <div className="mt-6">
        <LoanApprovalTable />
      </div>

      {/* Document verification */}
      <div className="mt-6">
        <DocumentVerificationTable />
      </div>
    </motion.div>
    </AdminLayout>
  );
}
