'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Teams, { teamArray } from '@/data/offseason-2/teams';
import PokemonCard from '@/components/standalone/pokemoncard';
import { BsDiscord, BsPersonFill } from 'react-icons/bs';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import { ReturnTypeMatchup, types } from '@/util/getTypeData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import schedule from '@/data/offseason-2/schedule.json';
import PlayerSchedule from '@/data/offseason-2/playerSchedule';
import returnMons from '@/data/pokemonData';
import topguns from '@/data/offseason-2/topguns.json';
import { nameSplit } from '@/util/nameSplit';

const sortOptions = [
  { value: 0, label: 'HP' },
  { value: 1, label: 'Attack' },
  { value: 2, label: 'Defense' },
  { value: 3, label: 'Sp. Attack' },
  { value: 4, label: 'Sp. Defense' },
  { value: 5, label: 'Speed' },
];

export default function TeamsView() {
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState(0);
  const returnPathTextArray = Teams();
  const pathname = usePathname().replace('/offseason-2/teams/', '');
  // @ts-expect-error
  const team = teamArray[pathname];

  useEffect(() => {
    const savedSort = localStorage.getItem('pokemonSort');
    if (savedSort !== null) {
      setSortBy(Number(savedSort));
    }
  }, []);

  const handleSortChange = (value: string) => {
    const numValue = Number(value);
    setSortBy(numValue);
    localStorage.setItem('pokemonSort', value);
  };

  //@ts-expect-error
  const sortedStats = topguns[team.discord].sort((a, b) => {
    return b.defeated - a.defeated;
  });

  const sortedPokemon = [...team.pokemon].sort((a, b) => {
    return returnMons(b).stats[sortBy].stat - returnMons(a).stats[sortBy].stat;
  });

  return (
    <main className='mt-20'>
      <div className='team-header'>
        <img
          className='team-picture'
          src={team.picture}
          width={85}
          height={85}
          alt={team.team}
        />
        <div className='team-container'>
          <h1 className='team-header-name'>{team.team}</h1>
          <div className='team-info-container'>
            <div className='team-info team-player'>
              <BsPersonFill />
              <div>{team.name}</div>
            </div>
            <div className='team-info team-showdown'>
              <MdOutlineCatchingPokemon />
              <div>{team.showdown}</div>
            </div>
            <div className='team-info team-discord'>
              <BsDiscord />
              <div>{team.discord}</div>
            </div>
          </div>
        </div>
        <div className='flex gap-4'>
          {view === 'grid' && (
            <Select onValueChange={handleSortChange} value={sortBy.toString()}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select onValueChange={(value) => setView(value)} defaultValue='grid'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select view' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='grid'>Pokémon</SelectItem>
              <SelectItem value='type'>Type Chart</SelectItem>
              <SelectItem value='schedule'>Scores</SelectItem>
              <SelectItem value='stats'>Stats</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === 'grid' && (
        <div className='pokemon-grid-container'>
          {sortedPokemon.map((pokemon: string, index: number) => (
            <PokemonCard pokemon={pokemon} key={index} />
          ))}
        </div>
      )}

      {view === 'schedule' && (
        <PlayerSchedule playerName={pathname} schedule={schedule} />
      )}

      {view === 'type' && (
        <div className='pokemon-type-relations-container'>
          <div className='type-relations-list-view'>
            <div className='type-matchup-header'>
              <div className='type-matchup-spacer'>Pokémon</div>
              {types.map((type, index) => (
                <div className='type-icon-container type-matchup' key={index}>
                  <img
                    src={`/icons/${type}.svg`}
                    height={30}
                    width={30}
                    data-type={type}
                    className='pokemon-type-icon list-view'
                    alt={`${type} type header`}
                  />
                  <div className='hover-only type_title' data-type={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                </div>
              ))}
            </div>
            <div className='type-matchup-data-container'>
              {returnPathTextArray().map((pokemon: any, index: number) => (
                <ReturnTypeMatchup pokemon={pokemon} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'stats' && (
        <>
          {/* <div className='italic text-xs'>Stats updated as of Week 7</div> */}
          <div className='player-stats-container'>
            {sortedStats.map((pokemon: any, index: number) => {
              return (
                <div className='pokemon-stats-container' key={index}>
                  <div className='pokemon-stats-position'>{index + 1}</div>
                  <img
                    className='card-picture'
                    src={returnMons(pokemon.pokemon).sprite}
                    alt=''
                    width={50}
                    height={50}
                  />
                  <div className='pokemon-stats-name-container'>
                    <div className='pokemon-stats-name'>
                      {nameSplit(pokemon.pokemon)}
                    </div>
                    {index > 3 ? (
                      <div className='pokemon-stats-defeated'>
                        Kills: {pokemon.defeated}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {index <= 3 ? (
                    <div className='pokemon-stats-defeated'>
                      {pokemon.defeated}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
            <div className='divider'></div>
          </div>
        </>
      )}
    </main>
  );
}
