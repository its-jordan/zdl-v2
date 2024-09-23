'use client';

import { useState } from 'react';
import { teamArrayMappable } from '@/data/offseason-2/teams';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import schedule from './schedule.json';
import topguns from './topguns.json';
import calcMaxWins from './calcMaxWins';

type TeamRecord = {
  wins: number;
  losses: number;
  streak: number;
  pokemonDefeated: number;
};

type SortOption =
  | 'winPercentage'
  | 'wins'
  | 'losses'
  | 'streak'
  | 'pokemonDefeated';

function calculateRecords(): Record<string, TeamRecord> {
  const records: Record<string, TeamRecord> = {};

  teamArrayMappable.forEach((team) => {
    records[team.discord] = {
      wins: 0,
      losses: 0,
      streak: 0,
      pokemonDefeated: 0,
    };
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

  // Calculate total Pokemon defeated for each team
  Object.entries(topguns).forEach(([discord, pokemon]) => {
    records[discord].pokemonDefeated = pokemon.reduce(
      (total, p) => total + Math.max(0, p.defeated),
      0
    );
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
    const maxWins = calcMaxWins();
    const gamesbehind = maxWins - wins;
    return gamesbehind == 0 ? '-' : gamesbehind;
  }

  function calculateGamesBehindNumber(record: TeamRecord) {
    const wins = record.wins;
    const maxWins = calcMaxWins();
    const gamesbehind = maxWins - wins;
    return gamesbehind;
  }

  const maximumWins = calcMaxWins();

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
      case 'pokemonDefeated':
        return (
          bRecord.pokemonDefeated - aRecord.pokemonDefeated ||
          bWinPercentage - aWinPercentage
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
              <SelectValue placeholder='Sort by Wins' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='wins'>Wins</SelectItem>
              <SelectItem value='losses'>Losses</SelectItem>
              <SelectItem value='winPercentage'>Win Percentage</SelectItem>
              <SelectItem value='streak'>Streak</SelectItem>
              <SelectItem value='pokemonDefeated'>Kills</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='standings-container'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead>W</TableHead>
              <TableHead>L</TableHead>
              <TableHead>PCT</TableHead>
              <TableHead>GB</TableHead>
              <TableHead>STRK</TableHead>
              <TableHead>KILLS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => {
              const record = records[team.discord];
              const winPercentage = calculateWinPercentage(record);
              return (
                <TableRow key={team.discord}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={team.picture}
                      alt={`${team.name}'s avatar`}
                      width={32}
                      height={32}
                      className='standings-team-avatar'
                    />
                  </TableCell>
                  <TableCell>
                    {calculateGamesBehindNumber(record) > 8 - maximumWins ? (
                      <div className='eliminated'>
                        <div>{team.team}</div>
                        <div className='eliminated-text'> E</div>
                      </div>
                    ) : (
                      <>{team.team}</>
                    )}
                  </TableCell>
                  <TableCell>{team.discord}</TableCell>
                  <TableCell>{record.wins}</TableCell>
                  <TableCell>{record.losses}</TableCell>
                  <TableCell>
                    {winPercentage == 1.0
                      ? winPercentage.toFixed(3)
                      : winPercentage.toFixed(3).toString().slice(1)}
                  </TableCell>
                  <TableCell>{calculateGamesBehind(record)}</TableCell>
                  <TableCell>
                    {record.streak > 0
                      ? `W${record.streak}`
                      : record.streak < 0
                      ? `L${Math.abs(record.streak)}`
                      : '-'}
                  </TableCell>
                  <TableCell>{record.pokemonDefeated}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className='eliminated'>
          <div className='eliminated-text'>E</div>
          <div className='eliminated-explanation'>{'-'} Eliminated</div>
        </div>
      </div>
    </>
  );
}
