import React, { useState } from 'react';
import { API_ENDPOINTS, apiRequest } from '../api/config';

function LoginForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest(`${API_ENDPOINTS.LOGIN}/${formData.username}`);
      if (response.payload && response.payload.password === formData.password) {
        onSubmit(response.payload);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-700">
        <h2 className="text-3xl font-bold text-red-500 mb-6 font-creepster">Enter The Game</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-700 to-red-900 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-red-900 hover:border-yellow-400"
            >
              Start Game
            </button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-800 hover:border-yellow-400"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
