//Frontend\src\App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Videos />} />
      </Routes>
    </>
  );
}

export default App;