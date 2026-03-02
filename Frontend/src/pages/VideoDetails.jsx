import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoDetails() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [commentText, setCommentText] = useState("");

    const handleLike = async () => {
        const { data } = await axios.put(
            `http://localhost:5000/api/videos/${id}/like`
        );

        setVideo((prev) => ({
            ...prev,
            likes: data.likes
        }));
    };

    const handleComment = async () => {
        if (!commentText.trim()) return;

        const { data } = await axios.post(
            `http://localhost:5000/api/videos/${id}/comments`,
            { text: commentText }
        );

        setVideo((prev) => ({
            ...prev,
            comments: data
        }));

        setCommentText("");
    };

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
                <div className="flex items-center gap-6 mb-6">

                    <button
                        onClick={handleLike}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        👍 Like ({video.likes})
                    </button>

                    <span className="text-gray-600">
                        {video.views} views
                    </span>

                </div>
                <div className="mt-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Comments
                    </h2>

                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border rounded-lg px-4 py-2"
                        />

                        <button
                            onClick={handleComment}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Post
                        </button>
                    </div>

                    <div className="space-y-4">
                        {video.comments?.map((comment, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-3 rounded-lg"
                            >
                                {comment.text}
                            </div>
                        ))}
                    </div>

                </div>

                <p className="text-gray-600">
                    {video.views} views
                </p>

            </div>
        </div>
    );
}