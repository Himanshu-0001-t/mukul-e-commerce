import React, { createContext, useContext, useState, useEffect } from 'react';

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

    const logout = () => {
        localStorage.removeItem('user_id');
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
