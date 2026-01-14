import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import ApplyLoan from "./pages/ApplyLoan";
import Documents from "./pages/Documents";
import LoanTracking from "./pages/LoanTracking";
import AdminLoans from "./pages/admin/AdminLoans";   // ✅ NEW
import Marketplace from "./pages/Marketplace";
import GreenDashboard from "./pages/GreenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminRoute from "./routes/AdminRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- AUTH ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- DASHBOARD LAYOUT ---------- */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/loan-tracking" element={<LoanTracking />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/green-dashboard" element={<GreenDashboard />} />

          {/* ---------- ADMIN (PROTECTED) ---------- */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route> {/* <-- Closing DashboardLayout */}
        {/* ✅ ADMIN LOANS (NEW) */}
          <Route
            path="/admin/loans"
            element={
              <AdminRoute>
                <AdminLoans />
              </AdminRoute>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
