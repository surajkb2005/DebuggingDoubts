//Frontend\src\Auth\Login.jsx
import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login(form);

            if (res.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-[#0f172a] via-[#0b1a3a] to-[#022c22] px-4">

            <div className="w-full max-w-5xl rounded-3xl 
    bg-white/10 backdrop-blur-xl border border-white/10 
    shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8">

                {/* LEFT SIDE */}
                <div className="flex-1 flex flex-col justify-center text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        Debugging Doubts
                    </h1>

                    <div className="space-y-2 text-sm text-gray-400">
                        <p>✔ Watch tutorials</p>
                        <p>✔ Solve doubts instantly</p>
                        <p>✔ Track your progress</p>
                    </div>
                </div>

                {/* RIGHT SIDE - LOGIN FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 bg-white/10 backdrop-blur-lg 
        p-6 rounded-2xl border border-white/10"
                >
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Login
                    </h2>

                    {error && (
                        <div className="bg-red-500/20 text-red-400 p-2 rounded mb-3 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-3 rounded-lg bg-white/20 
          text-white placeholder-gray-300 outline-none"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-4 rounded-lg bg-white/20 
          text-white placeholder-gray-300 outline-none"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    {/* Button */}
                    <button className="w-full py-3 rounded-lg 
        bg-gradient-to-r from-indigo-500 to-purple-600 
        hover:opacity-90 transition text-white font-semibold">
                        Login
                    </button>

                    <p className="text-sm text-gray-300 mt-4 text-center">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-indigo-400 cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;