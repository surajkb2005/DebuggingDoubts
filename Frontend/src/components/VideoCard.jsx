import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>

      <div className="
        group bg-white border border-gray-200
        rounded-xl overflow-hidden
        shadow-sm hover:shadow-lg
        transition-all duration-300
        hover:-translate-y-1
      ">

        {/* Thumbnail */}
        <div className="relative overflow-hidden">

          <img
            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
            alt={video.title}
            className="
              w-full h-48 object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
          />

          {/* Category badge */}
          {video.category && (
            <span className="
              absolute top-3 left-3
              bg-blue-600 text-white
              text-xs font-semibold
              px-3 py-1 rounded-full
              shadow
            ">
              {video.category}
            </span>
          )}

        </div>

        {/* Content */}
        <div className="p-4">

          <h3 className="
            text-md font-semibold
            text-gray-900
            line-clamp-2
            group-hover:text-blue-600
            transition-colors
          ">
            {video.title}
          </h3>

          {/* Stats */}
          <div className="flex justify-between items-center mt-3 text-sm text-gray-500">

            <span>
              👁 {video.views || 0} views
            </span>

            <span>
              👍 {video.likes || 0}
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
};

export default VideoCard;