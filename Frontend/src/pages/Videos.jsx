//Frontend\src\pages\Videos.jsx
import React from "react";
import { useEffect, useState } from "react";
import { fetchVideos } from "../services/videoService";
import VideoCard from "../components/VideoCard";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredVideos = videos.filter((video) => {

    const matchesSearch =
      video.title.toLowerCase().includes(search.toLowerCase()) ||
      video.category?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      video.category?.toLowerCase().includes(category.toLowerCase());

    return matchesSearch && matchesCategory;

  });

  useEffect(() => {
    const getVideos = async () => {
      try {
        const { data } = await fetchVideos();
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    };

    getVideos();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-24 px-6 text-center">

        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Master Computer Science
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              One Debug At A Time
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Watch structured CSE tutorials, ask doubts instantly,
            and level up your coding skills with Debugging Doubts.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
              Explore Videos
            </button>

            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
              Start Learning
            </button>
          </div>
        </div>
      </div>

      {/* VIDEO GRID SECTION */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search algorithms, data structures..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full max-w-xl
                px-5 py-3
                border border-gray-300
                rounded-xl
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">

            {["All", "Web", "DSA", "OS", "DBMS", "CN"].map((cat) => (

              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`
        px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200
        ${category === cat
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }
      `}
              >
                {cat}
              </button>

            ))}

          </div>
          <h1 className="text-3xl font-bold mb-10 text-gray-900">
            Latest Videos
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}