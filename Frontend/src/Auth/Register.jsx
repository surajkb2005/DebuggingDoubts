//Frontend\src\Auth\Register.jsx
import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);
            await register({
                name: form.name,
                email: form.email,
                password: form.password
            });

            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-white">

            {/* LEFT SIDE - Branding */}
            <div className="hidden md:flex md:w-1/2 flex-col justify-center px-16 bg-gradient-to-br from-blue-600 to-purple-700">
                <h1 className="text-4xl font-bold mb-4">
                    Join Debugging Doubts
                </h1>

                <p className="text-lg mb-6">
                    Level up your coding skills with structured CSE learning.
                </p>

                <ul className="space-y-3 text-base">
                    <li>✔ Watch structured CSE tutorials</li>
                    <li>✔ Ask doubts on every video</li>
                    <li>✔ Track your learning progress</li>
                    <li>✔ Connect with fellow learners</li>
                </ul>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="flex flex-1 items-center justify-center px-6 py-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg"
                >
                    <h2 className="text-3xl font-bold mb-2">
                        Create Your Account
                    </h2>

                    <p className="text-gray-400 mb-6">
                        Start your journey toward mastering Computer Science.
                    </p>

                    {error && (
                        <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a strong password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block mb-1 text-sm">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Re-enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-3 rounded font-semibold"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    {/* Footer */}
                    <p className="text-gray-400 text-sm mt-6 text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;