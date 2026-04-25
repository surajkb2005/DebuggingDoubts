//Frontend\src\App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import VideoDetails from "./pages/VideoDetails";
import Navbar from "./components/Navbar";
import Login from "./Auth/Login";
import AuthPage from "./Auth/AuthPage";
import Register from "./Auth/Register";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";
import Animations from "./pages/Animations";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      {/* Main content */}
      <main className="pt-24">

        {/* 👇 Optional loading screen */}
        {loading ? (
          <div className="text-center mt-20 text-gray-500">
            Waking up server... ⏳
          </div>
        ) : (
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Videos />} />
            <Route path="/animations" element={<Animations />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
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
        )}
      </main>

    </div>
  );
}

export default App;