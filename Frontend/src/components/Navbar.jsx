//Frontend\src\components\Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

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
          <NavLink
            to="/animations"
            className={({ isActive }) =>
              `relative px-2 py-1 transition-all duration-300 ${isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Animations
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-500 transition-all duration-300 ${isActive ? "scale-x-100" : "scale-x-0"
                    } origin-left`}
                />
              </>
            )}
          </NavLink>
          {user ? (
            <>
              {/* Dashboard */}
              <NavLink
                to="/dashboard"
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Dashboard
              </NavLink>

              {/* ADMIN LINK (FIXED) */}
              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition"
                >
                  Admin Panel 🚀
                </NavLink>
              )}

              {/* User Info */}
              <span className="text-gray-400">
                Welcome, <span className="text-white">{user.name}</span>
              </span>

              {/* Logout */}
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
                to="/auth"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition active:scale-95"
              >
                Login/Register
              </NavLink>
            </>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-b border-gray-800 flex flex-col px-6 py-6 gap-4 shadow-xl">
          <NavLink to="/" onClick={closeMenu} className="text-gray-300 text-lg hover:text-blue-400">Home</NavLink>
          <NavLink to="/animations" onClick={closeMenu} className="text-gray-300 text-lg hover:text-blue-400">Animations</NavLink>
          
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu} className="text-gray-300 text-lg hover:text-blue-400">Dashboard</NavLink>
              
              {user.role === "admin" && (
                <NavLink to="/admin" onClick={closeMenu} className="text-purple-400 text-lg hover:text-purple-300">Admin Panel 🚀</NavLink>
              )}
              
              <div className="h-px w-full bg-gray-700 my-2"></div>
              
              <span className="text-gray-400 text-lg">
                Welcome, <span className="text-white">{user.name}</span>
              </span>
              
              <button onClick={() => { logout(); closeMenu(); }} className="mt-2 w-full bg-blue-600 py-3 rounded-lg text-white font-semibold active:scale-95">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth" onClick={closeMenu} className="mt-2 w-full text-center bg-blue-600 py-3 rounded-lg text-white font-semibold active:scale-95">
              Login / Register
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;