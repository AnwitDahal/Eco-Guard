import React, { useEffect } from 'react';
import { useAuthStore } from '../store/AppStore';

const Leaderboard = () => {
  const { leaderboardData, isLoading, error, fetchLeaderboardData } = useAuthStore();

  useEffect(() => {
    fetchLeaderboardData(); // Fetch data on component mount
  }, [fetchLeaderboardData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-200 p-2">Rank</th>
          <th className="border border-gray-200 p-2">Player</th>
          <th className="border border-gray-200 p-2">Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map((player, index) => (
          <tr key={player.id}>
            <td className="border border-gray-200 p-2">{index + 1}</td>
            <td className="border border-gray-200 p-2">{player.name}</td>
            <td className="border border-gray-200 p-2">{player.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
