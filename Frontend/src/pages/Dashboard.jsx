//Frontend/src/pages/Dashboard.jsx
import React from "react";
import { useEffect, useState } from "react";
import ProgressChart from "../components/ProgressChart";
import axios from "../services/axiosInstance";

export default function Dashboard() {

    const [stats, setStats] = useState({
        watched: 0,
        likes: 0,
        comments: 0
    });
    const [categories, setCategories] = useState([]);
    const [progress, setProgress] = useState([]);

    useEffect(() => {

        const fetchStats = async () => {
            const { data } = await axios.get("/dashboard");
            setStats({
                watched: data.watched
            });

            setCategories(data.categoryStats);
            setProgress(data.dailyProgress);
        };

        fetchStats();

    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12">

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Dashboard
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-gray-500 text-sm">Welcome back</p>
                            <p className="font-semibold">Learning Progress</p>
                        </div>

                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            U
                        </div>
                    </div>

                </div>


                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500 text-sm">Videos Watched</p>
                        <h2 className="text-3xl font-bold">{stats.watched}</h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500 text-sm">Likes Given</p>
                        <h2 className="text-3xl font-bold">{stats.likes || 0}</h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500 text-sm">Comments Made</p>
                        <h2 className="text-3xl font-bold">{stats.comments || 0}</h2>
                    </div>

                </div>

                <div className="mb-12">

                    <ProgressChart
                        dataPoints={
                            progress.length
                                ? progress.map(p => ({
                                    date: p._id,
                                    count: p.count
                                }))
                                : [{ date: "Start", count: 0 }]
                        }
                    />

                </div>

                {/* Topic Progress */}
                <div className="bg-white p-8 rounded-xl shadow mb-12">

                    <h2 className="text-xl font-semibold mb-6">
                        Topic Progress
                    </h2>

                    <div className="space-y-5">

                        {categories.map((cat) => (

                            <div key={cat._id}>

                                <div className="flex justify-between mb-2 text-sm">
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


                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow">

                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">
                            Recent Activity
                        </h2>
                    </div>

                    {/* {recent.map((item, index) => (

                        <div
                            key={index}
                            className="flex justify-between p-5 border-b last:border-none"
                        >

                            <span>
                                Watched <strong>{item.videoId?.title}</strong>
                            </span>

                            <span className="text-gray-500 text-sm">
                                {new Date(item.watchedAt).toLocaleDateString()}
                            </span>

                        </div>

                    ))} */}

                </div>

            </div>

        </div>
    );
}