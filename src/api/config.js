const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_BASE_URL}/account/username`,
    
    // Stage
    GET_STAGES: `${API_BASE_URL}/stage/account`,
    COMPLETE_STAGE: `${API_BASE_URL}/stage/complete`,
    CREATE_STAGE: `${API_BASE_URL}/stage/create`,
    
    // Leaderboard
    GET_LEADERBOARD: `${API_BASE_URL}/leaderboard/all`,
    UPDATE_LEADERBOARD: `${API_BASE_URL}/leaderboard/create`,
};

export const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(endpoint, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        
        return data;
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};
