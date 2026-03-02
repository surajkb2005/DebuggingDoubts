//Frontend\src\App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import VideoDetails from "./pages/VideoDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route path="/video/:id" element={<VideoDetails />} />
      </Routes>
    </>
  );
}

export default App;