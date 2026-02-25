import { useEffect, useState } from "react";
import { fetchVideos } from "../services/videoService";

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
    <div style={{ padding: "40px" }}>
      <h1>Debugging Doubts Videos</h1>

      {videos.map((video) => (
        <div key={video._id} style={{ marginBottom: "20px" }}>
          <h3>{video.title}</h3>
          <p>{video.category}</p>
          <p>{video.views} views</p>
          <p>{video.duration}</p>
        </div>
      ))}
    </div>
  );
}