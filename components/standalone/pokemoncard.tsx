import returnMons from '@/data/pokemonData';
import { nameSplit } from '@/util/nameSplit';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardData {
  pokemon: string;
}

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

export default function PokemonCard({ pokemon }: CardData) {
  const mon = pokemon;
  const data = returnMons(mon);
  const maxspeed = calcMaxSpeed(data.stats[5].stat, '');
  const choicescarf = calcMaxSpeed(data.stats[5].stat, 'choicescarf');
  const tailwind = calcMaxSpeed(data.stats[5].stat, 'tailwind');
  return (
    <div className='card' data-type={data.types[0]}>
      <div className='card-top'>
        <img
          className='card-picture pokemon'
          src={data.sprite}
          alt={`${nameSplit(data.name)}'s sprite`}
          width={50}
          height={50}
        />
        <Link
          className='card-title'
          href={`https://www.smogon.com/dex/sv/pokemon/${data.name}`}>
          {nameSplit(data.name)}
        </Link>
        <div className='card-type'>
          {data.types.map((type, index) => {
            return (
              <div key={index} className='card-type-icons' data-type={type}>
                <img
                  src={`/icons/${type}.svg`}
                  width={50}
                  height={50}
                  alt=''
                  className='pokemon-type-icon'
                />
                <div className='hover-only type_title' data-type={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='card-stats'>
        {data.stats.map((stat, index) => {
          return (
            <div key={index} className='card-stat'>
              <div className='card-stat-name'>{stat.name}</div>
              <div className='card-stat-value'>{stat.stat}</div>
            </div>
          );
        })}
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
      </div>
    </div>
  );
}
