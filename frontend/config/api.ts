// API Configuration
// This file centralizes the API URL configuration.
// It uses the VITE_API_URL environment variable if available, 
// otherwise it falls back to localhost for development.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getApiUrl = (endpoint: string) => {
    return `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};

export default API_URL;
