import returnMons from '@/data/pokemonData';
import Image from 'next/image';
import { nameSplit } from './nameSplit';

export const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

interface Pokemon extends Partial<CSSStyleDeclaration> {
  pokemon: string;
  direction?: 'ascending' | 'descending';
  sortStat?: 'HP' | 'ATK' | 'SPATK' | 'DEF' | 'SPDEF' | 'SPEED';
  children?: React.ReactNode;
  link?: string;
}

export function ReturnTypeMatchup({ pokemon }: Pokemon) {
  const mon = pokemon;
  const data = returnMons(mon);
  return (
    <div className='type-matchup-data'>
      <div className='type-matchup-pokemon' data-type={`${data.types[0]}`}>
        <img
          loading='lazy'
          className='pokemon-img matchup-data'
          src={data.sprite}
          width={40}
          height={40}
          alt={`Sprite for ${data.name}.`}
          data-type={data.types[1] ? data.types[1] : data.types[0]}
        />
        <div className=''>{nameSplit(data.name)}</div>
      </div>
      {types.map((type, index) => {
        return (
          <button
            key={index}
            className={`type-heading`}
            data-column={index + 1}>
            {data.weaknesses.includes(`${type}: .25x`) ? (
              <div className={`multiplier quarter`} data-multiplier={'.25x'}>
                {'1/4'}
              </div>
            ) : data.weaknesses.includes(`${type}: 0.5x`) ? (
              <div className={`multiplier half`} data-multiplier={'.5x'}>
                {'1/2'}
              </div>
            ) : data.weaknesses.includes(`${type}: 2x`) ? (
              <div className={`multiplier double`} data-multiplier={'2x'}>
                {'2x'}
              </div>
            ) : data.weaknesses.includes(`${type}: 4x`) ? (
              <div className={`multiplier quadruple`} data-multiplier={'4x'}>
                {'4x'}
              </div>
            ) : data.weaknesses.includes(`${type}: 0x`) ? (
              <div className={`multiplier immune`} data-multiplier={'0'}>
                {'0'}
              </div>
            ) : (
              <div className={`multiplier normal`} data-multiplier={'1x'}>
                {''}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
