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
        <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-[#0f172a] via-[#0b1a3a] to-[#022c22] px-4">

            <div className="w-full max-w-5xl rounded-3xl 
    bg-white/10 backdrop-blur-xl border border-white/10 
    shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8">

                {/* LEFT SIDE */}
                <div className="flex-1 flex flex-col justify-center text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        Debugging Doubts 🚀
                    </h1>

                    <p className="text-gray-300 mb-6">
                        Your learning platform for mastering Computer Science.
                    </p>

                    <div className="space-y-2 text-sm text-gray-400">
                        <p>✔ Watch tutorials</p>
                        <p>✔ Solve doubts instantly</p>
                        <p>✔ Track your progress</p>
                    </div>
                </div>

                {/* RIGHT SIDE - LOGIN FORM */}
                <form className="flex-1 bg-white/10 backdrop-blur-lg 
p-6 rounded-2xl border border-white/10">

                    <h2 className="text-xl font-semibold text-white mb-4">
                        Create Account
                    </h2>

                    <input type="text" placeholder="Full Name" className="input" />
                    <input type="email" placeholder="Email" className="input" />
                    <input type="password" placeholder="Password" className="input" />
                    <input type="password" placeholder="Confirm Password" className="input" />

                    <button className="btn">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default Register;