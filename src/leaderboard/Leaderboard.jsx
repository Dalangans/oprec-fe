import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, apiRequest } from '../api/config';

function Leaderboard({ onNavigate }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.GET_LEADERBOARD);
        setLeaderboardData(response.payload);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-lg p-8 max-w-2xl w-full text-center border border-gray-700">
        <h2 className="text-3xl font-bold text-red-500 mb-6 font-creepster">Leaderboard</h2>
        
        {/* Leaderboard table */}
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-right">Score</th>
                <th className="py-3 px-4 text-right">Stages Cleared</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={entry.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-yellow-500">#{index + 1}</td>
                  <td className="py-3 px-4">{entry.account.username}</td>
                  <td className="py-3 px-4 text-right">{entry.score}</td>
                  <td className="py-3 px-4 text-right">{entry.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-black text-white text-lg font-bold shadow hover:scale-105 transition-all duration-200 border-2 border-gray-700 hover:border-yellow-400"
          onClick={() => onNavigate('home')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
