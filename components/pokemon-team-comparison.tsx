'use client';

import { useState } from 'react';
import { teamArray } from '@/data/offseason-2/teams';
import returnMons from '@/data/pokemonData';
import { Radar } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChartContainer } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { nameSplit } from '@/util/nameSplit';
import Image from 'next/image';

type PokemonData = ReturnType<typeof returnMons>;

export default function PokemonTeamComparison() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');

  const getTeamData = (teamName: string) => {
    const team = teamArray[teamName as keyof typeof teamArray];
    if (!team) return null;
    return {
      ...team,
      pokemonData: team.pokemon.map(returnMons),
    };
  };

  const team1Data = getTeamData(team1 ? team1 : '');
  const team2Data = getTeamData(team2);

  const pokemon1Data = team1Data?.pokemonData.find((p) => p.name === pokemon1);
  const pokemon2Data = team2Data?.pokemonData.find((p) => p.name === pokemon2);

  // const chartData =
  //   pokemon1Data && pokemon2Data
  //     ? pokemon1Data.stats.map((stat, index) => ({
  //         stat: stat.name,
  //         [pokemon1Data.name]: stat.stat,
  //         [pokemon2Data.name]: pokemon2Data.stats[0].stat,
  //       }))
  //     : [];

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardContent className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Pokémon Comparison</h1>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <Select onValueChange={setTeam1}>
              <SelectTrigger>
                <SelectValue placeholder='Select Team 1' />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(teamArray).map((team) => (
                  <SelectItem
                    key={team}
                    value={team}
                    disabled={team == team2 ? true : false}>
                    <div className='team-select'>
                      <Image
                        className='card-picture'
                        src={teamArray[team as keyof typeof teamArray].picture}
                        alt=''
                        width={30}
                        height={30}></Image>
                      <div className='team-select-names'>
                        <div>
                          {teamArray[team as keyof typeof teamArray].discord}
                        </div>
                        <div className='team-select-player'>
                          {teamArray[team as keyof typeof teamArray].team}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select onValueChange={setTeam2}>
              <SelectTrigger>
                <SelectValue placeholder='Select Team 2' />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(teamArray).map((team) => (
                  <SelectItem
                    key={team}
                    value={team}
                    disabled={team == team1 ? true : false}>
                    <div className='team-select'>
                      <Image
                        className='card-picture'
                        src={teamArray[team as keyof typeof teamArray].picture}
                        alt=''
                        width={30}
                        height={30}></Image>
                      <div className='team-select-names'>
                        <div>
                          {teamArray[team as keyof typeof teamArray].discord}
                        </div>
                        <div className='team-select-player'>
                          {teamArray[team as keyof typeof teamArray].team}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {team1Data && (
            <div>
              <Select onValueChange={setPokemon1}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Pokémon 1' />
                </SelectTrigger>
                <SelectContent>
                  {team1Data.pokemonData.map((pokemon) => (
                    <SelectItem key={pokemon.name} value={pokemon.name}>
                      {nameSplit(pokemon.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {team2Data && (
            <div>
              <Select onValueChange={setPokemon2}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Pokémon 2' />
                </SelectTrigger>
                <SelectContent>
                  {team2Data.pokemonData.map((pokemon) => (
                    <SelectItem key={pokemon.name} value={pokemon.name}>
                      {nameSplit(pokemon.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {pokemon1Data && pokemon2Data && (
          <div className='pokemon-comparison-mons'>
            <PokemonDisplay pokemon={pokemon1Data} opponent={pokemon2Data} />
            <PokemonDisplay pokemon={pokemon2Data} opponent={pokemon1Data} />
          </div>
        )}
        {/* {chartData.length > 0 && (
          <ChartContainer className='h-[300px] mt-4'>
            <Radar
              data={chartData}
              dataKey={pokemon1Data?.name}
              stroke='hsl(var(--primary))'
              fill='hsl(var(--primary))'
              fillOpacity={0.6}
            />
            <Radar
              data={chartData}
              dataKey={pokemon2Data?.name}
              stroke='hsl(var(--secondary))'
              fill='hsl(var(--secondary))'
              fillOpacity={0.6}
            />
          </ChartContainer>
        )} */}
      </CardContent>
    </Card>
  );
}

function PokemonDisplay({
  pokemon,
  opponent,
}: {
  pokemon: PokemonData;
  opponent: PokemonData;
}) {
  const getTypeEffectiveness = (type: string) => {
    if (pokemon.weaknesses.includes(`${type}: 0.25x`)) return 'Super Resistant';
    if (pokemon.weaknesses.includes(`${type}: 0.5x`)) return 'Resistant';
    if (pokemon.weaknesses.includes(`${type}: 2x`)) return 'Weak';
    if (pokemon.weaknesses.includes(`${type}: 4x`)) return 'Super Weak';
    if (pokemon.weaknesses.includes(`${type}: 0x`)) return 'Immune';
    return 'Normal';
  };

  const typeEffectiveness = opponent.types.map((type) => ({
    type,
    effectiveness: getTypeEffectiveness(type),
  }));

  function calcMaxSpeed(e: number, item: string) {
    const nature = 1.1;
    const formula = (e * 2 + 99) * nature;
    const speed =
      item == 'choicescarf'
        ? Math.floor(formula * 1.5 - 1)
        : item == 'tailwind'
        ? Math.floor(formula * 2 - 1)
        : Math.floor(formula - 1);
    return speed;
  }

  const maxspeed = calcMaxSpeed(pokemon.stats[5].stat, '');
  const choicescarf = calcMaxSpeed(pokemon.stats[5].stat, 'choicescarf');
  const tailwind = calcMaxSpeed(pokemon.stats[5].stat, 'tailwind');

  return (
    <div className='card effectiveness' data-type={pokemon.types[0]}>
      <div className='card-top'>
        <Image
          className='card-picture'
          src={pokemon.sprite}
          alt={`${pokemon.name}'s sprite.`}
          width={50}
          height={50}></Image>
        <div className='card-title'>{nameSplit(pokemon.name)}</div>
        <div className='card-type'>
          {pokemon.types.map((type, index) => {
            return (
              <div key={index} className='card-type-icons' data-type={type}>
                <Image
                  src={`/icons/${type}.svg`}
                  width={50}
                  height={50}
                  alt=''></Image>
              </div>
            );
          })}
        </div>
      </div>
      <div className='card-stats'>
        {pokemon.stats.map((stat) => (
          <div key={stat.name} className='card-stat'>
            <div className='card-stat-name'>{stat.name}</div>
            <div className='card-stat-value'>{stat.stat}</div>
          </div>
        ))}
      </div>
      <div className='card-stats-container'>
        <h2 className='card-header'>Speed Calculations</h2>
        <div className='card-stats'>
          <div className='card-stat'>
            <div className='card-stat-name'>MAX</div>
            <div className='card-stat-value'>{maxspeed}</div>
          </div>
          <div className='card-stat'>
            <div className='card-stat-name'>+1S</div>
            <div className='card-stat-value'>{choicescarf}</div>
          </div>
          <div className='card-stat'>
            <div className='card-stat-name'>+2S</div>
            <div className='card-stat-value'>{tailwind}</div>
          </div>
        </div>
        <div className='card-stats-container mt-4'>
          <div className='card-effectiveness'>
            {typeEffectiveness.map(({ type, effectiveness }) => (
              <>
                {effectiveness === 'Normal' ? (
                  <></>
                ) : (
                  <>
                    <h2 className='card-header effectiveness'>Type Matchup</h2>
                    <div
                      key={type}
                      className='effectiveness-badge'
                      data-effectiveness={effectiveness}>
                      <div
                        key={type}
                        className='card-type-icons'
                        data-type={type}>
                        <Image
                          src={`/icons/${type}.svg`}
                          width={25}
                          height={25}
                          alt=''></Image>
                      </div>
                      <div>{effectiveness}</div>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
