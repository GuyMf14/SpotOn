// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { spotonService } from '../services/spoton.service';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // טעינת המשתמש המחובר בעת טעינת האפליקציה
        const loadUser = async () => {
            try {
                const loggedInUser = await spotonService.getLoggedInUser();
                setUser(loggedInUser);
            } catch (err) {
                console.log('No user is logged in.');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    // פונקציות הניתנות לשיתוף
    const login = async (credentials) => {
        const loggedInUser = await spotonService.login(credentials);
        setUser(loggedInUser);
    };

    const logout = async () => {
        await spotonService.logout();
        setUser(null);
    };

    // ערך הקונטקסט שיהיה זמין לכל רכיב
    const contextValue = {
        user,
        setUser,
        login,
        logout,
        isLoading,
        isAdmin: user && user.role === 'admin' // דוגמה להרשאה
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};