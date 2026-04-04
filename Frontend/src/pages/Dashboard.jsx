//Frontend/src/pages/Dashboard.jsx
import React from "react";
import { useEffect, useState } from "react";
import ProgressChart from "../components/ProgressChart";
import axios from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";
import RecommendedSection from "../components/RecommendedSection";

export default function Dashboard() {

    const [stats, setStats] = useState({
        watched: 0,
        likes: 0,
        comments: 0
    });
    const [categories, setCategories] = useState([]);
    const [progress, setProgress] = useState([]);
    const [streak, setStreak] = useState(0);
    const { user } = useAuth();

    useEffect(() => {

        const fetchStats = async () => {
            const { data } = await axios.get("/dashboard");
            setStats({
                watched: data.watched
            });

            setCategories(data.categoryStats);
            setProgress(data.dailyProgress);
            setStreak(data.streak);
        };

        fetchStats();

    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12">

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-12">

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Welcome back, <span className="text-blue-600">{user?.name}</span> 👋
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track your learning journey and keep improving every day.
                        </p>
                    </div>

                    {/* Avatar */}
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 
  rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {user?.name?.charAt(0)}
                    </div>

                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <p className="text-gray-500 text-sm">Videos Watched</p>
                        <h2 className="text-3xl font-bold text-blue-600">{stats.watched}</h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <p className="text-gray-500 text-sm">Likes Given</p>
                        <h2 className="text-3xl font-bold text-pink-500">{stats.likes || 0}</h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <p className="text-gray-500 text-sm">Comments Made</p>
                        <h2 className="text-3xl font-bold text-green-600">{stats.comments || 0}</h2>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <p className="text-gray-500 text-sm">Learning Streak</p>
                        <h2 className="text-3xl font-bold text-orange-500">
                            🔥 {streak} Days
                        </h2>
                    </div>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Learning Streak</p>
                    <h2 className="text-3xl font-bold text-orange-500">
                        🔥 {streak} Days
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">

                    {/* Progress Chart */}
                    <ProgressChart
                        dataPoints={progress.map(p => ({
                            date: p._id,
                            count: p.count
                        }))}
                    />

                    {/* Topic Progress */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-6">
                            Topic Progress
                        </h2>
                        <div className="space-y-5">
                            {categories.map((cat) => (
                                <div key={cat._id}>
                                    <div className="flex justify-between text-sm mb-2">
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

                <div className="bg-white p-6 rounded-xl shadow mt-10">

                    <h2 className="text-xl font-semibold mb-6">
                        Achievements
                    </h2>

                    <div className="grid grid-cols-3 gap-6 text-center">

                        <div className="p-4 bg-yellow-100 rounded-lg">
                            ⭐ First Video
                        </div>

                        <div className="p-4 bg-green-100 rounded-lg">
                            🎯 5 Videos Watched
                        </div>

                        <div className="p-4 bg-orange-100 rounded-lg">
                            🔥 3 Day Streak
                        </div>

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
                <RecommendedSection />
            </div>

        </div>
    );
}