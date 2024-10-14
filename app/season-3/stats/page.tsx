'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import stats from '@/data/season-3/topguns.json';
import { teamArray } from '@/data/season-3/teams';
import { nameSplit } from '@/util/nameSplit';
import returnMons from '@/data/pokemonData';

type Pokemon = {
  pokemon: string;
  defeated: number;
};

type TeamData = {
  [key: string]: Pokemon[];
};

const data: TeamData = stats;

export default function PokemonStats() {
  const [sortBy, setSortBy] = useState<'team' | 'pokemon' | 'defeated'>(
    'defeated'
  );

  const flattenedData = useMemo(() => {
    return Object.entries(data).flatMap(([team, pokemons]) =>
      pokemons.map((p) => ({ team, ...p }))
    );
  }, []);

  const sortedData = useMemo(() => {
    return [...flattenedData].sort((a, b) => {
      if (sortBy === 'team') return a.team.localeCompare(b.team);
      if (sortBy === 'pokemon') return a.pokemon.localeCompare(b.pokemon);
      return b.defeated - a.defeated;
    });
  }, [flattenedData, sortBy]);

  return (
    <main className='mt-20'>
      <div className='team-header'>
        <div className='team-container'>
          <h1 className='team-header-name'>Pokémon Stats</h1>
        </div>
        <div className='flex gap-4'>
          <Select
            onValueChange={(value) =>
              setSortBy(value as 'team' | 'pokemon' | 'defeated')
            }>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by Defeated' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='defeated'>Sort by Defeated</SelectItem>
              <SelectItem value='team'>Sort by Team</SelectItem>
              <SelectItem value='pokemon'>Sort by Pokémon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <div className='italic text-xs'>Stats updated as of Week 7</div> */}
      <div className='all-stats-container'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Pokémon</TableHead>
              <TableHead>Defeated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className='table-player'>
                    <img
                      className='team-picture'
                      src={
                        //   @ts-expect-error
                        teamArray[item.team].picture
                      }
                      width={40}
                      height={40}
                      alt={
                        //   @ts-expect-error
                        teamArray[item.team].discord
                      }
                    />
                    <div className='table-player-name-container'>
                      <div className='table-player-team'>
                        {
                          //   @ts-expect-error
                          teamArray[item.team].team
                        }
                      </div>
                      <div className='table-player-discord'>
                        {
                          //   @ts-expect-error
                          teamArray[item.team].discord
                        }
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='table-pokemon'>
                    <img
                      className='card-picture table'
                      src={returnMons(item.pokemon).sprite}
                      alt=''
                      width={40}
                      height={40}
                    />
                    {nameSplit(item.pokemon)}
                    <div className='card-type'>
                      {returnMons(item.pokemon).types.map((type, index) => {
                        return (
                          <div
                            key={index}
                            className='card-type-icons-table'
                            data-type={type}>
                            <img
                              src={`/icons/${type}.svg`}
                              width={20}
                              height={20}
                              alt=''
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.defeated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
