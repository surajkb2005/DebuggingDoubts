//Frontend\src\components\Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          Debugging Doubts
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-2 py-1 transition-all duration-300 ${isActive
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-500 transition-all duration-300 ${isActive ? "scale-x-100" : "scale-x-0"
                    } origin-left`}
                />
              </>
            )}
          </NavLink>

          {user ? (
            <>
              <span className="text-gray-400">
                Welcome, <span className="text-white">{user.name}</span>
              </span>

              <button
                onClick={logout}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-blue-400 transition ${isActive ? "text-blue-500" : "text-gray-300"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition active:scale-95"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;