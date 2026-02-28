import { useEffect, useState } from "react";
import { fetchVideos } from "../services/videoService";
import VideoCard from "../components/VideoCard";
import React from "react";

export default function Videos() {
  const [videos, setVideos] = useState([]);

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
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">
        Latest Videos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}