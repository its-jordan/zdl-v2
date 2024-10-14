import { useState, useEffect } from 'react';
import games from './schedule.json';

type Match = {
  player1: string;
  player2: string;
  score: string;
};

type Week = Match[];

type Schedule = {
  [key: string]: Week;
};

type PlayerRecord = {
  player: string;
  wins: number;
};

const schedule: Schedule = games;

export default function calcMaxWins() {
  const [maxWins, setMaxWins] = useState<number>(0);

  useEffect(() => {
    const analyzeTournamentRecords = (schedule: Schedule) => {
      const playerWins: { [key: string]: number } = {};

      // Iterate through each week
      for (const week in schedule) {
        const matches = schedule[week];

        // Iterate through each match in the week
        for (const match of matches) {
          const { player1, player2, score } = match;

          // Skip matches that haven't happened yet
          if (score === '0-0') continue;

          const [score1, score2] = score.split('-').map(Number);

          // Update win count for player1
          if (score1 > score2) {
            playerWins[player1] = (playerWins[player1] || 0) + 1;
          }
          // Update win count for player2
          else if (score2 > score1) {
            playerWins[player2] = (playerWins[player2] || 0) + 1;
          }
        }
      }

      // Find the maximum number of wins
      const maxWins = Math.max(...Object.values(playerWins));

      // Find players with the maximum number of wins
      const bestPlayers = Object.entries(playerWins)
        .filter(([_, wins]) => wins === maxWins)
        .map(([player, wins]) => ({ player, wins }));

      return { maxWins, bestPlayers };
    };

    const result = analyzeTournamentRecords(schedule);
    setMaxWins(result.maxWins);
  }, []);

  return maxWins;
}
