
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
