// src/components/RecommendedSection.jsx
import React from "react";
import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import VideoCard from "./VideoCard";

const API = import.meta.env.VITE_API_URL;

export default function RecommendedSection() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const { data } = await axios.get(`${API}/recommendations`);
                setVideos(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Recommended For You
            </h2>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {videos.map((video) => (
                    <div key={video._id} className="min-w-[250px]">
                        <VideoCard video={video} />
                    </div>
                ))}
            </div>
        </div>
    );
}