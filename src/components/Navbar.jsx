// const Navbar = () => {
//   return (
//     <header className="h-16 bg-white shadow-sm flex items-center px-6">
//       <h1 className="text-lg font-semibold text-gray-700">
//         GreenFin Dashboard
//       </h1>
//     </header>
//   );
// };

// export default Navbar;



import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="h-16 bg-white shadow flex items-center px-6">
      <h1 className="text-xl font-semibold text-gray-800">
        {isAdmin ? "GreenFin Admin Panel" : "GreenFin Dashboard"}
      </h1>
    </header>
  );
};

export default Navbar;
