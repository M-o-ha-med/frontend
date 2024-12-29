import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const logo = "/assets/Logo.svg";
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    setIsLoggedIn(!!token);
    setUserRole(userRole || "");
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole("");
    navigate('/');
  };

  return (
    <nav className="bg-white px-4 lg:px-5 py-3 lg:py-0 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        
        <button
          className="lg:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="fas fa-bars"></span>
        </button>
        
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex items-center space-x-4 transition-all duration-300 ease-in-out`}
        >
          {/* Show Home and About for empty userRole or User role */}
          {( userRole === "User") && (
            <>
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/about-us" className="text-gray-700 hover:text-gray-900 font-medium">
                About
              </Link>
            <Link to="/booking" className="text-gray-700 hover:text-gray-900 font-medium">
              Booking
            </Link>
            </>
          )}
          
          {/* Only show Booking for User role */}

          {/* Authentication Buttons */}
          {userRole === "" ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/about-us" className="text-gray-700 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link
                to="/login"
                className="btn bg-blue-600 text-white rounded-full py-2 px-4 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn bg-blue-600 text-white rounded-full py-2 px-4 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="btn bg-red-600 text-white rounded-full py-2 px-4 hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}