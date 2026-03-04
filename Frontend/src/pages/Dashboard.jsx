//Frontend/src/pages/Dashboard.jsx
import React from "react";
import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

export default function Dashboard() {

    const [stats, setStats] = useState({
        watched: 0,
        likes: 0,
        comments: 0
    });

    useEffect(() => {

        const fetchStats = async () => {
            const { data } = await axios.get("/users/dashboard");
            setStats(data);
        };

        fetchStats();

    }, []);

    return (

        <div className="py-16 bg-gray-50 min-h-screen">

            <div className="max-w-6xl mx-auto px-6">

                <h1 className="text-3xl font-bold mb-10">
                    Learning Dashboard
                </h1>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500 text-sm">Videos Watched</h2>
                        <p className="text-3xl font-bold">{stats.watched}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500 text-sm">Likes Given</h2>
                        <p className="text-3xl font-bold">{stats.likes}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500 text-sm">Comments Made</h2>
                        <p className="text-3xl font-bold">{stats.comments}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}