import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoDetails() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/api/videos/${id}`
            );

            setVideo(data);
        };

        fetchVideo();
    }, [id]);

    if (!video) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">

                {video.videoId && (
                    <iframe
                        className="w-full h-[400px] rounded-xl mb-6"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        allowFullScreen
                    ></iframe>
                )}

                <h1 className="text-2xl font-bold mb-2">
                    {video.title}
                </h1>

                <p className="text-gray-600">
                    {video.views} views
                </p>

            </div>
        </div>
    );
}