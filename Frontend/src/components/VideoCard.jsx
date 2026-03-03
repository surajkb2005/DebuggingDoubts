import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="
        group relative overflow-hidden
        bg-gray-900 border border-gray-800
        rounded-xl shadow-lg
        hover:shadow-2xl hover:shadow-blue-500/20
        transform hover:-translate-y-2
        transition-all duration-300
      ">

        {/* Thumbnail */}
        <div className="relative">
          <img
            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-48 object-cover"
          />

          {/* Gradient Overlay */}
          <div className="
            absolute inset-0 
            bg-gradient-to-t from-black/70 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          " />

          {/* Views Badge */}
          <div className="
            absolute bottom-2 right-2
            bg-black/70 backdrop-blur-md
            text-xs px-3 py-1 rounded-full
            text-gray-200
          ">
            👁 {video.views} views
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="
            text-lg font-semibold mb-2
            group-hover:text-blue-400
            transition-colors duration-300
          ">
            {video.title}
          </h3>

          <div className="flex justify-between text-sm text-gray-400">
            <span>{video.category}</span>
            <span>👍 {video.likes}</span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default VideoCard;