'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';

// Import the JSON data
import tradesData from '@/data/season-3/trades.json';

import { nameSplit } from '@/util/nameSplit';
import { teamArray } from '@/data/season-3/teams';

// Inferred types
interface Trade {
  removed: string[];
  added: string[];
}

interface TradesData {
  [player: string]: Trade;
}

// Type assertion for the imported JSON data
const typedTradesData: TradesData = tradesData;

export default function PokemonTrades() {
  const [selectedPlayer, setSelectedPlayer] = useState<keyof TradesData>(
    Object.keys(typedTradesData)[0]
  );

  const handlePlayerChange = (value: string) => {
    setSelectedPlayer(value as keyof TradesData);
  };

  const team = teamArray;

  return (
    <main className='mt-20'>
      <div className='team-header'>
        <div className='team-container trades'>
          <h1 className='team-header-name'>Pokémon Trades</h1>
          <div className='team-header-trades-player'>
            {'> '}
            {selectedPlayer}
          </div>
        </div>
        <div className='flex gap-4'>
          {/* @ts-expect-error */}
          <Select onValueChange={handlePlayerChange} value={selectedPlayer}>
            <SelectTrigger className='w-max mb-4'>
              <SelectValue placeholder='Select a player' />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(typedTradesData).map((player) => (
                <SelectItem key={player} value={player}>
                  <div className='team-select'>
                    <img
                      className='card-picture'
                      src={
                        // @ts-expect-error
                        team[player].picture
                      }
                      alt=''
                      width={30}
                      height={30}
                    />
                    <div className='team-select-names'>
                      <div>
                        {
                          // @ts-expect-error
                          team[player].discord
                        }
                      </div>
                      <div className='team-select-player pr-4'>
                        {
                          // @ts-expect-error
                          team[player].team
                        }
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedPlayer && (
        <div className='team-trades-container'>
          <div className='team-trades'>
            {typedTradesData[selectedPlayer].removed.map((pokemon, index) => (
              <div key={index} className='text-red-500 pokemon-trade'>
                <LuMinusCircle /> {nameSplit(pokemon)}
              </div>
            ))}
          </div>
          <div className='team-trades'>
            {typedTradesData[selectedPlayer].added.map((pokemon, index) => (
              <div key={index} className='text-green-500 pokemon-trade'>
                <LuPlusCircle /> {nameSplit(pokemon)}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
