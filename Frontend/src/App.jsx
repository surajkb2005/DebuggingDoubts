//Frontend\src\App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import VideoDetails from "./pages/VideoDetails";
import Navbar from "./components/Navbar";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      {/* Main content */}
      <main className="pt-24">

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Videos />} />

          <Route
            path="/video/:id"
            element={
              <ProtectedRoute>
                <VideoDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

    </div>
  );
}

export default App;