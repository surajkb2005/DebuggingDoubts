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
            await login(form);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg w-96"
            >
                <h2 className="text-2xl mb-4 text-white">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button className="bg-blue-600 w-full py-2 text-white">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;