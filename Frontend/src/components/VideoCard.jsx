import React from "react";

export default function VideoCard({ video }) {
  return (
    <div className="w-80 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {video.title}
        </h3>

        <p className="text-sm text-gray-500">
          {video.views} views • {video.duration}
        </p>
      </div>
    </div>
  );
}