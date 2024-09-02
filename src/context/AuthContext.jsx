import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('user_id');
        if (token) {
            setUser(token);
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('user_id', token);
        setUser(token)
    };

    const logout = async () => {
        try {
            let response = await axiosInstance.post("/logout")

            if (response.data.success) {
                localStorage.removeItem('user_id');
                setUser(null)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
