// src/services/spoton.service.js
import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/'
    : 'http://localhost:3030/api/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const spotonService = {
    // Users
    getUsers: () => axiosInstance.get('user'),
    getUserById: (id) => axiosInstance.get(`user/${id}`),
    createUser: (user) => axiosInstance.post('user', user),
    updateUser: (id, user) => axiosInstance.put(`user/${id}`, user),
    deleteUser: (id) => axiosInstance.delete(`user/${id}`),

    // Rates
    getRates: () => axiosInstance.get('rate'),
    getRateById: (id) => axiosInstance.get(`rate/${id}`),
    createRate: (rate) => axiosInstance.post('rate', rate),
    updateRate: (id, rate) => axiosInstance.put(`rate/${id}`, rate),
    deleteRate: (id) => axiosInstance.delete(`rate/${id}`),

    // Parking Sessions
    getSessions: () => axiosInstance.get('session'),
    getSessionById: (id) => axiosInstance.get(`session/${id}`),
    createSession: (session) => axiosInstance.post('session', session),
    endSession: (id) => axiosInstance.put(`session/${id}/end`),
    markSessionAsPaid: (id) => axiosInstance.put(`session/${id}/pay`),
    updateSession: (id, session) => axiosInstance.put(`session/${id}`, session),
    deleteSession: (id) => axiosInstance.delete(`session/${id}`)
};
