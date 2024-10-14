'use client';

import { useState, useMemo, useEffect } from 'react';
import { teamArray } from './teams';
import returnMons from '@/data/pokemonData';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { nameSplit } from '@/util/nameSplit';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Link from 'next/link';

type PokemonData = ReturnType<typeof returnMons>;
type SpeedType = 'base' | 'max' | 'choicescarf' | 'tailwind';

function calcMaxSpeed(e: number, item: string) {
  const nature = 1.1;
  const formula = (e * 2 + 99) * nature;
  const speed =
    item == 'choicescarf'
      ? Math.floor(formula * 1.5)
      : item == 'tailwind'
      ? Math.floor(formula * 2)
      : Math.floor(formula);
  return speed;
}

export default function PokemonTeamComparison() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [speedType1, setSpeedType1] = useState<SpeedType>('base');
  const [speedType2, setSpeedType2] = useState<SpeedType>('base');

  // Load saved selections from localStorage on component mount
  useEffect(() => {
    const savedTeam1 = localStorage.getItem('team1');
    const savedTeam2 = localStorage.getItem('team2');
    const savedPokemon1 = localStorage.getItem('pokemon1');
    const savedPokemon2 = localStorage.getItem('pokemon2');
    const savedSpeedType1 = localStorage.getItem('speedType1') as SpeedType;
    const savedSpeedType2 = localStorage.getItem('speedType2') as SpeedType;

    if (savedTeam1) setTeam1(savedTeam1);
    if (savedTeam2) setTeam2(savedTeam2);
    if (savedPokemon1) setPokemon1(savedPokemon1);
    if (savedPokemon2) setPokemon2(savedPokemon2);
    if (savedSpeedType1) setSpeedType1(savedSpeedType1);
    if (savedSpeedType2) setSpeedType2(savedSpeedType2);
  }, []);

  // Save selections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('team1', team1);
    localStorage.setItem('team2', team2);
    localStorage.setItem('pokemon1', pokemon1);
    localStorage.setItem('pokemon2', pokemon2);
    localStorage.setItem('speedType1', speedType1);
    localStorage.setItem('speedType2', speedType2);
  }, [team1, team2, pokemon1, pokemon2, speedType1, speedType2]);

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

  const formatChartData = useMemo(
    () => (pokemon1: PokemonData, pokemon2: PokemonData) => {
      const statNames = ['HP', 'ATT', 'DEF', 'SPA', 'SPD', 'SPE'];
      return statNames.map((stat, index) => {
        if (stat === 'SPE') {
          const getSpeedValue = (
            pokemon: PokemonData,
            speedType: SpeedType
          ) => {
            const baseSpeed = pokemon.stats[5].stat;
            switch (speedType) {
              case 'max':
                return calcMaxSpeed(baseSpeed, '');
              case 'choicescarf':
                return calcMaxSpeed(baseSpeed, 'choicescarf');
              case 'tailwind':
                return calcMaxSpeed(baseSpeed, 'tailwind');
              default:
                return baseSpeed;
            }
          };
          return {
            stat,
            [pokemon1.name]: getSpeedValue(pokemon1, speedType1),
            [pokemon2.name]: getSpeedValue(pokemon2, speedType2),
          };
        }
        return {
          stat,
          [pokemon1.name]: pokemon1.stats[index].stat,
          [pokemon2.name]: pokemon2.stats[index].stat,
        };
      });
    },
    [speedType1, speedType2]
  );

  const chartData = useMemo(
    () =>
      pokemon1Data && pokemon2Data
        ? formatChartData(pokemon1Data, pokemon2Data)
        : [],
    [pokemon1Data, pokemon2Data, formatChartData]
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-background border border-border rounded p-2 shadow-md'>
          <p className='font-bold'>{payload[0].payload.stat}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {nameSplit(entry.name)}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardContent className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Pokémon Comparison</h1>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div>
            <Select value={team1} onValueChange={setTeam1}>
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
                      <img
                        className='card-picture'
                        src={teamArray[team as keyof typeof teamArray].picture}
                        alt=''
                        width={30}
                        height={30}
                      />
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
            <Select value={team2} onValueChange={setTeam2}>
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
                      <img
                        className='card-picture'
                        src={teamArray[team as keyof typeof teamArray].picture}
                        alt=''
                        width={30}
                        height={30}
                      />
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
              <Select value={pokemon1} onValueChange={setPokemon1}>
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
              <Select value={pokemon2} onValueChange={setPokemon2}>
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
          <>
            <div className='pokemon-comparison-mons'>
              <PokemonDisplay pokemon={pokemon1Data} opponent={pokemon2Data} />
              <PokemonDisplay pokemon={pokemon2Data} opponent={pokemon1Data} />
            </div>
            <div className='mt-4 flex justify-between'>
              <Select
                value={speedType1}
                onValueChange={(value) => setSpeedType1(value as SpeedType)}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select speed type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='base'>Base Speed</SelectItem>
                  <SelectItem value='max'>Max Speed</SelectItem>
                  <SelectItem value='choicescarf'>Choice Scarf</SelectItem>
                  <SelectItem value='tailwind'>Tailwind</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={speedType2}
                onValueChange={(value) => setSpeedType2(value as SpeedType)}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select speed type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='base'>Base Speed</SelectItem>
                  <SelectItem value='max'>Max Speed</SelectItem>
                  <SelectItem value='choicescarf'>Choice Scarf</SelectItem>
                  <SelectItem value='tailwind'>Tailwind</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='mt-4 h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <RadarChart data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey='stat' />
                  <Radar
                    name={nameSplit(pokemon1Data.name)}
                    dataKey={pokemon1Data.name}
                    stroke={`var(--${returnMons(pokemon1Data.name).types[0]})`}
                    fill={`var(--${returnMons(pokemon1Data.name).types[0]})`}
                    fillOpacity={0.5}
                  />
                  <Radar
                    name={nameSplit(pokemon2Data.name)}
                    dataKey={pokemon2Data.name}
                    stroke={`var(--${returnMons(pokemon2Data.name).types[0]})`}
                    fill={`var(--${returnMons(pokemon2Data.name).types[0]})`}
                    fillOpacity={0.5}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
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
    if (pokemon.weaknesses.includes(`${type}: 0.25x`))
      return 'Not Very Effective';
    if (pokemon.weaknesses.includes(`${type}: 0.5x`)) return 'Not Effective';
    if (pokemon.weaknesses.includes(`${type}: 2x`)) return 'Effective';
    if (pokemon.weaknesses.includes(`${type}: 4x`)) return 'Super Effective';
    if (pokemon.weaknesses.includes(`${type}: 0x`)) return 'Immune';
    return 'Normal';
  };

  const typeEffectiveness = opponent.types.map((type) => ({
    type,
    effectiveness: getTypeEffectiveness(type),
  }));

  const maxspeed = calcMaxSpeed(pokemon.stats[5].stat, '');
  const choicescarf = calcMaxSpeed(pokemon.stats[5].stat, 'choicescarf');
  const tailwind = calcMaxSpeed(pokemon.stats[5].stat, 'tailwind');

  return (
    <div className='card effectiveness' data-type={pokemon.types[0]}>
      <div className='card-top'>
        <img
          className='card-picture'
          src={pokemon.sprite}
          alt={`${pokemon.name}'s sprite.`}
          width={50}
          height={50}
        />
        <Link
          className='card-title'
          href={`https://www.smogon.com/dex/sv/pokemon/${pokemon.name}`}
          target='_blank'>
          {nameSplit(pokemon.name)}
        </Link>
        <div className='card-type'>
          {pokemon.types.map((type, index) => {
            return (
              <div
                key={index}
                className='card-type-icons-table'
                data-type={type}>
                <img src={`/icons/${type}.svg`} width={50} height={50} alt='' />
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
                        <img
                          src={`/icons/${type}.svg`}
                          width={25}
                          height={25}
                          alt=''
                        />
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
