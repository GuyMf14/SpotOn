// src/services/spoton.service.js
import axios from 'axios';

// ה-URL של השרת Express
const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/'
    : '//localhost:3030/api/';

const axiosInstance = axios.create({
    withCredentials: true // חשוב כדי לשלוח קוקיז (JWT)
})

export const spotonService = {
    login,
    logout,
    signup,
    getLoggedInUser,
    // ... נוסיף פונקציות כמו loadSessions, updateRate וכו'.
};

// פונקציות בסיסיות לניהול משתמשים:
async function login(credentials) {
    const res = await axiosInstance.post(BASE_URL + 'auth/login', credentials);
    return res.data;
}

async function signup(userInfo) {
    const res = await axiosInstance.post(BASE_URL + 'auth/signup', userInfo);
    return res.data;
}

async function logout() {
    return await axiosInstance.post(BASE_URL + 'auth/logout');
}

async function getLoggedInUser() {
    // נניח שיש לנו ראוטר שמחזיר את היוזר לפי הקוקי
    const res = await axiosInstance.get(BASE_URL + 'auth/user'); 
    return res.data;
}