'use client';

import { useState } from 'react';
import { teamArrayMappable } from '@/data/offseason-2/teams';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import schedule from '@/data/offseason-2/schedule.json';

type TeamRecord = {
  wins: number;
  losses: number;
  streak: number;
};

type SortOption = 'winPercentage' | 'wins' | 'losses' | 'streak';

function calculateRecords(): Record<string, TeamRecord> {
  const records: Record<string, TeamRecord> = {};

  teamArrayMappable.forEach((team) => {
    records[team.discord] = { wins: 0, losses: 0, streak: 0 };
  });

  Object.values(schedule).forEach((week) => {
    week.forEach((match) => {
      if (match.score !== '0-0') {
        const [score1, score2] = match.score.split('-').map(Number);
        if (score1 > score2) {
          records[match.player1].wins++;
          records[match.player2].losses++;
          records[match.player1].streak =
            records[match.player1].streak > 0
              ? records[match.player1].streak + 1
              : 1;
          records[match.player2].streak =
            records[match.player2].streak < 0
              ? records[match.player2].streak - 1
              : -1;
        } else {
          records[match.player1].losses++;
          records[match.player2].wins++;
          records[match.player1].streak =
            records[match.player1].streak < 0
              ? records[match.player1].streak - 1
              : -1;
          records[match.player2].streak =
            records[match.player2].streak > 0
              ? records[match.player2].streak + 1
              : 1;
        }
      }
    });
  });

  return records;
}

function calculateWinPercentage(record: TeamRecord): number {
  const totalGames = record.wins + record.losses;
  return totalGames > 0 ? record.wins / totalGames : 0;
}

export default function Standings() {
  const [sortOption, setSortOption] = useState<SortOption>('winPercentage');
  const records = calculateRecords();

  function calculateGamesBehind(record: TeamRecord) {
    const wins = record.wins;
    const maxWins = 3;
    const gamesbehind = maxWins - wins;
    return gamesbehind == 0 ? '-' : gamesbehind;
  }

  const sortedTeams = [...teamArrayMappable].sort((a, b) => {
    const aRecord = records[a.discord];
    const bRecord = records[b.discord];
    const aWinPercentage = calculateWinPercentage(aRecord);
    const bWinPercentage = calculateWinPercentage(bRecord);

    switch (sortOption) {
      case 'wins':
        return bRecord.wins - aRecord.wins || bWinPercentage - aWinPercentage;
      case 'losses':
        return (
          bRecord.losses - aRecord.losses || aWinPercentage - bWinPercentage
        );
      case 'streak':
        return (
          bRecord.streak - aRecord.streak || bWinPercentage - aWinPercentage
        );
      case 'winPercentage':
      default:
        return bWinPercentage - aWinPercentage || bRecord.wins - aRecord.wins;
    }
  });

  return (
    <>
      <div className='team-header'>
        <div className='team-container'>
          <h1 className='team-header-name'>League Standings</h1>
        </div>
        <div className=''>
          <Select onValueChange={(value: SortOption) => setSortOption(value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='winPercentage'>Win Percentage</SelectItem>
              <SelectItem value='wins'>Wins</SelectItem>
              <SelectItem value='losses'>Losses</SelectItem>
              <SelectItem value='streak'>Streak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='standings-container'>
        <div className='standings-header'>
          <div className='standings-team-content rank'></div>
          <div className='standings-team-content team'>Team</div>
          <div className='standings-team-content wins'>W</div>
          <div className='standings-team-content losses'>L</div>
          <div className='standings-team-content winpercentage'>PCT</div>
          <div className='standings-team-content gb'>GB</div>
          <div className='standings-team-content streak'>STRK</div>
        </div>
        <div className='standings-content'>
          {sortedTeams.map((team, index) => {
            const record = records[team.discord];
            const winPercentage = calculateWinPercentage(record);
            return (
              <div className='standings-team' key={team.discord}>
                <div className='standings-team-content rank'>{index + 1}</div>
                <div className='standings-team-content team'>
                  <div className='standings-team-container'>
                    <img
                      src={team.picture}
                      alt={`${team.name}'s avatar`}
                      width={32}
                      height={32}
                      className='standings-team-avatar'
                    />
                    <div className='standings-team-name'>
                      <div className='standings-team-team'>{team.team}</div>
                      <div className='standings-team-discord'>
                        {team.discord}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='standings-team-content wins'>{record.wins}</div>
                <div className='standings-team-content losses'>
                  {record.losses}
                </div>
                <div className='standings-team-content winpercentage'>
                  {winPercentage == 1.0
                    ? winPercentage.toFixed(3)
                    : winPercentage.toFixed(3).toString().slice(1)}
                </div>
                <div className='standings-team-content gb'>
                  {calculateGamesBehind(record)}
                </div>
                <div className='standings-team-content streak'>
                  {record.streak > 0
                    ? `W${record.streak}`
                    : record.streak < 0
                    ? `L${Math.abs(record.streak)}`
                    : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
