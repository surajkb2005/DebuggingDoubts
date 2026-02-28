import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-2xl font-bold text-red-500">
        Debugging Doubts
      </h1>

      <div className="space-x-6 text-gray-300">
        <a href="/" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">Courses</a>
        <a href="#" className="hover:text-white transition">About</a>
      </div>
    </div>
  );
}