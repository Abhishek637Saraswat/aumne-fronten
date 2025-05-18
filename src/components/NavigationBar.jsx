import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all ${
      isActive ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-gray-700"
    }`;

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Flight Booker ✈️</h1>
        <nav className="flex gap-3">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/add-flight" className={navLinkClasses}>Add Flight</NavLink>
          {/* <NavLink to="/cancel" className={navLinkClasses}>Cancel Ticket</NavLink> */}
          <NavLink to="/show-bookings" className={navLinkClasses}>Show Bookings</NavLink>
        </nav>
      </div>
    </header>
  );
}
