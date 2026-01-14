import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role")?.toUpperCase(); // SAFE

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-6 text-xl font-bold text-green-600">
        GreenFin
      </div>

      <nav className="px-4 space-y-2">
        <NavLink to="/dashboard" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </NavLink>

        <NavLink to="/apply-loan" className="block p-2 rounded hover:bg-gray-100">
          Apply Loan
        </NavLink>

        <NavLink to="/documents" className="block p-2 rounded hover:bg-gray-100">
          Documents
        </NavLink>

        <NavLink to="/loan-tracking" className="block p-2 rounded hover:bg-gray-100">
          Loan Tracking
        </NavLink>

        <NavLink to="/marketplace" className="block p-2 rounded hover:bg-gray-100">
          Marketplace
        </NavLink>

        <NavLink to="/green-dashboard" className="block p-2 rounded hover:bg-gray-100">
          Green Impact
        </NavLink>

        {/* ✅ ADMIN ONLY */}
        {role === "ADMIN" && (
          <NavLink
            to="/admin"
            className="block p-2 rounded bg-green-50 text-green-700 font-semibold"
          >
            Admin Panel
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
