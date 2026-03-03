import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="
        group relative overflow-hidden
        bg-white border border-gray-200
        rounded-xl shadow-md
        hover:shadow-lg
        transform hover:-translate-y-1
        transition-all duration-300
      ">

        {/* Thumbnail */}
        <img
          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />

        {/* Content */}
        <div className="p-4">
          <h3 className="
            text-lg font-semibold mb-2
            text-gray-900
            group-hover:text-blue-600
            transition-colors duration-300
          ">
            {video.title}
          </h3>

          <div className="flex justify-between text-sm text-gray-500">
            <span>{video.category}</span>
            <span>👍 {video.likes}</span>
          </div>
        </div>

      </div>
    </Link>
  );
};


export default VideoCard;