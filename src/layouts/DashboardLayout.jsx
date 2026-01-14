

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <Outlet /> {/* ✅ REQUIRED FOR ROUTES TO RENDER */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
