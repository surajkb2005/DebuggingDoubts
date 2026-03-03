//Frontend\src\context\AuthContext.jsx
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (data) => {
        const res = await axios.post("/auth/login", data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
    };

    const register = async (data) => {
        const res = await axios.post("/auth/register", data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);