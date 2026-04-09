import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { login, register } = useAuth();
    const navigate = useNavigate();

    // LOGIN SUBMIT
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login(loginForm);
            navigate(res.role === "admin" ? "/admin" : "/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    // REGISTER SUBMIT
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (registerForm.password !== registerForm.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);
            await register(registerForm);
            setIsLogin(true); // switch to login after register
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f172a] via-[#0b1a3a] to-[#022c22] px-4">

            <div className="relative w-full max-w-5xl h-[500px] rounded-3xl 
      overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl flex">

                {/* LOGIN */}
                <div className="w-1/2 flex items-center justify-center">
                    {isLogin && (
                        <form onSubmit={handleLogin} className="w-full max-w-sm text-white">
                            <h2 className="text-2xl mb-4">Login</h2>

                            {error && (
                                <div className="text-red-400 text-sm mb-2">{error}</div>
                            )}

                            <input
                                placeholder="Email"
                                className="input"
                                onChange={(e) =>
                                    setLoginForm({ ...loginForm, email: e.target.value })
                                }
                            />

                            <input
                                placeholder="Password"
                                type="password"
                                className="input"
                                onChange={(e) =>
                                    setLoginForm({ ...loginForm, password: e.target.value })
                                }
                            />

                            <button className="btn mt-2">Login</button>
                        </form>
                    )}
                </div>

                {/* REGISTER */}
                <div className="w-1/2 flex items-center justify-center">
                    {!isLogin && (
                        <form onSubmit={handleRegister} className="w-full max-w-sm text-white">
                            <h2 className="text-2xl mb-4">Register</h2>

                            {error && (
                                <div className="text-red-400 text-sm mb-2">{error}</div>
                            )}

                            <input
                                placeholder="Name"
                                className="input"
                                onChange={(e) =>
                                    setRegisterForm({ ...registerForm, name: e.target.value })
                                }
                            />

                            <input
                                placeholder="Email"
                                className="input"
                                onChange={(e) =>
                                    setRegisterForm({ ...registerForm, email: e.target.value })
                                }
                            />

                            <input
                                placeholder="Password"
                                type="password"
                                className="input"
                                onChange={(e) =>
                                    setRegisterForm({ ...registerForm, password: e.target.value })
                                }
                            />

                            <input
                                placeholder="Confirm Password"
                                type="password"
                                className="input"
                                onChange={(e) =>
                                    setRegisterForm({
                                        ...registerForm,
                                        confirmPassword: e.target.value
                                    })
                                }
                            />

                            <button className="btn mt-2">
                                {loading ? "Creating..." : "Register"}
                            </button>
                        </form>
                    )}
                </div>

                {/* SLIDING PANEL */}
                <div
                    className={`absolute top-0 h-full w-1/2 z-20 
          bg-gradient-to-r from-indigo-500 to-purple-600 
          flex items-center justify-center text-white 
          transition-all duration-700
          ${isLogin ? "left-1/2" : "left-0"}`}
                >
                    <div className="text-center px-6">
                        <h2 className="text-2xl font-bold mb-2">
                            {isLogin ? "New here?" : "Welcome back!"}
                        </h2>

                        <p className="mb-4 text-sm">
                            {isLogin
                                ? "Create an account to get started"
                                : "Login to continue your journey"}
                        </p>

                        <button
                            onClick={() => {
                                setError("");
                                setIsLogin(!isLogin);
                            }}
                            className="border border-white px-4 py-2 rounded-lg"
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;