//Frontend\src\App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import VideoDetails from "./pages/VideoDetails";
import Navbar from "./components/Navbar";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Videos />} />
        <Route path="/video/:id" element={<ProtectedRoute><VideoDetails /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;