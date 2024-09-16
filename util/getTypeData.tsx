import returnMons from '@/data/pokemonData';
import Image from 'next/image';
import { nameSplit, splitMoveName } from './nameSplit';
import { BsFillExclamationCircleFill } from 'react-icons/bs';

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

  function returnAbilityImmunity(e: string | undefined) {
    function getImmunityType() {
      if (e == 'dry-skin' || e == 'flash-fire') {
        return 'fire';
      } else if (e == 'earth-eater' || e == 'levitate') {
        return 'ground';
      } else if (e == 'storm-drain' || e == 'water-absorb') {
        return 'water';
      } else if (e == 'lightning-rod' || e == 'volt-absorb') {
        return 'electric';
      } else if (e == 'sap-sipper') {
        return 'grass';
      } else {
        return;
      }
    }
    if (
      e == 'earth-eater' ||
      e == 'dry-skin' ||
      e == 'flash-fire' ||
      e == 'levitate' ||
      e == 'lightning-rod' ||
      e == 'sap-sipper' ||
      e == 'storm-drain' ||
      e == 'volt-absorb' ||
      e == 'water-absorb'
    ) {
      return (
        <>
          <div className='ability-warning'>
            <BsFillExclamationCircleFill />
          </div>
          <div className='ability-immunity'>
            {nameSplit(mon)} is immune to {getImmunityType()} if{' '}
            <span className='font-bold'>{splitMoveName(e)}</span> is chosen as{' '}
            {nameSplit(mon)}
            's ability.
          </div>
        </>
      );
    } else if (e === undefined) {
      return;
    } else {
      return;
    }
  }
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
        <div className='type-matchup-pokemon-name'>{nameSplit(data.name)}</div>
        {data.abilities.map((ability) => returnAbilityImmunity(ability))}
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
