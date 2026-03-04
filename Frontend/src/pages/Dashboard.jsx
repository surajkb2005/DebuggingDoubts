//Frontend/src/pages/Dashboard.jsx
import React from "react";
import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
const { data } = await axios.get("/dashboard");

export default function Dashboard() {

    const [stats, setStats] = useState({
        watched: 0,
        likes: 0,
        comments: 0
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchStats = async () => {
            const { data } = await axios.get("/dashboard");
            setStats({
                watched: data.watched
            });

            setCategories(data.categoryStats);
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
                <div className="mt-12">

                    <h2 className="text-xl font-semibold mb-6">
                        Topic Progress
                    </h2>

                    <div className="space-y-4">

                        {categories.map((cat) => (

                            <div key={cat._id}>

                                <div className="flex justify-between mb-1 text-sm">
                                    <span>{cat._id}</span>
                                    <span>{cat.count} videos</span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-3">

                                    <div
                                        className="bg-blue-600 h-3 rounded-full"
                                        style={{ width: `${cat.count * 10}%` }}
                                    />

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}