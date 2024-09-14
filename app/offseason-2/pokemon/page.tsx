'use client';

import PokemonCard from '@/components/standalone/pokemoncard';
import pokemon from '@/data/pokemon/allpokemon.json';
import pokemon2 from '@/data/pokemon/allpokemon2.json';
import pokemon3 from '@/data/pokemon/allpokemon3.json';
import pokemon4 from '@/data/pokemon/allpokemon4.json';
import pokemon5 from '@/data/pokemon/allpokemon5.json';
import pokemon6 from '@/data/pokemon/allpokemon6.json';
import pokemon7 from '@/data/pokemon/allpokemon7.json';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import returnMons from '@/data/pokemonData';

const sortOptions = [
  { value: 0, label: 'HP' },
  { value: 1, label: 'Attack' },
  { value: 2, label: 'Defense' },
  { value: 3, label: 'Sp. Attack' },
  { value: 4, label: 'Sp. Defense' },
  { value: 5, label: 'Speed' },
];

const allMons = pokemon
  .concat(pokemon2)
  .concat(pokemon3)
  .concat(pokemon4)
  .concat(pokemon5)
  .concat(pokemon6)
  .concat(
    pokemon7
      .filter((item) => pokemon.indexOf(item) < 0)
      .filter((item) => pokemon2.indexOf(item) < 0)
      .filter((item) => pokemon3.indexOf(item) < 0)
      .filter((item) => pokemon4.indexOf(item) < 0)
      .filter((item) => pokemon5.indexOf(item) < 0)
      .filter((item) => pokemon6.indexOf(item) < 0)
  );

export default function PokemonPage() {
  const [sortBy, setSortBy] = useState(0);

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

  const sortedPokemon = allMons.sort((a, b) => {
    return returnMons(b).stats[sortBy].stat - returnMons(a).stats[sortBy].stat;
  });

  return (
    <main className='mt-20'>
      <div className='team-header'>
        <div className='team-container'>
          <h1 className='team-header-name'>Pokémon</h1>
        </div>
        <div className='flex gap-4'>
          <Select onValueChange={handleSortChange} value={sortBy.toString()}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='pokemon-grid-container'>
        {sortedPokemon.map((pokemon, index) => {
          return <PokemonCard pokemon={pokemon} key={index}></PokemonCard>;
        })}
      </div>
    </main>
  );
}
