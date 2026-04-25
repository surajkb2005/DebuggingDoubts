//Frontend/src/pages/Admin.jsx
import React from "react";
import { useState } from "react";
import axios from "../services/axiosInstance";

const API = import.meta.env.VITE_API_URL;

export default function Admin() {
    const [form, setForm] = useState({
        title: "",
        category: "",
        duration: "",
        videoId: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.category || !form.videoId || !form.duration) {
            alert("Please fill all fields");
            return;
        }

        const payload = {
            ...form,
            thumbnail: `https://img.youtube.com/vi/${form.videoId}/maxresdefault.jpg`
        };

        try {
            await axios.post(`${API}/videos`, payload);
            alert("Video uploaded successfully 🚀");
            setForm({
                title: "",
                category: "",
                duration: "",
                videoId: ""
            });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6 text-gray-900">
                    Admin Panel 🎬
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input name="title" placeholder="Title"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg" />

                    <input name="category" placeholder="Category (DSA, OS...)"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg" />

                    <input name="duration" placeholder="Duration (10:30)"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg" />

                    <input name="videoId" placeholder="YouTube Video ID"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg" />

                    {form.videoId && (
                        <img
                            src={`https://img.youtube.com/vi/${form.videoId}/maxresdefault.jpg`}
                            alt="Preview"
                            className="w-full rounded-lg mt-4"
                        />
                    )}

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                        Upload Video
                    </button>

                </form>

            </div>
        </div>
    );
}