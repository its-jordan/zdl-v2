'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import WeeklySchedule from '@/data/offseason-2/schedule.json';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { teamArray } from '@/data/offseason-2/teams';

export default function Scores() {
  const [week, setWeek] = useState('week-1');
  useEffect(() => {
    const savedWeek = localStorage.getItem('selected-week');
    if (savedWeek !== null) {
      setWeek(savedWeek);
    }
  }, []);

  const handleWeekChange = (value: string) => {
    const week = value;
    setWeek(week);
    localStorage.setItem('selected-week', value);
  };

  const weekArray = [
    'week-1',
    'week-2',
    'week-3',
    'week-4',
    'week-5',
    'week-6',
    'week-7',
    'week-8',
  ];

  return (
    <main className='mt-20'>
      <div className='team-header'>
        <div className='team-container'>
          <h1 className='team-header-name'>
            {week.charAt(0).toUpperCase() + week.slice(1).replace('-', ' ')}
          </h1>
        </div>
        <Select
          onValueChange={handleWeekChange}
          defaultValue='week-1'
          value={week.toString()}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select Week' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='week-1'>Week 1</SelectItem>
            <SelectItem value='week-2'>Week 2</SelectItem>
            <SelectItem value='week-3'>Week 3</SelectItem>
            <SelectItem value='week-4'>Week 4</SelectItem>
            <SelectItem value='week-5'>Week 5</SelectItem>
            <SelectItem value='week-6'>Week 6</SelectItem>
            <SelectItem value='week-7'>Week 7</SelectItem>
            <SelectItem value='week-8'>Week 8</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {weekArray.map((weekNumber, index) => {
        return (
          <Fragment key={index}>
            {week === weekNumber && (
              <div className='player-schedule-container' data-week={weekNumber}>
                {
                  //@ts-ignore
                  WeeklySchedule[weekNumber].map((match, index) => {
                    return (
                      <div className='player-schedule-match' key={index}>
                        <div className='player-schedule-info'>
                          <div className='player-schedule-teams'>
                            <Link
                              className='player-team'
                              href={`/offseason-2/teams/${match.player1}`}>
                              <img
                                className='player-team-image'
                                // @ts-expect-error
                                src={teamArray[match.player1].picture}
                                width={50}
                                height={50}
                                // @ts-expect-error
                                alt={teamArray[match.player1].discord}
                              />
                              <div className='player-name-container'>
                                <div className='player-team-name'>
                                  {
                                    // @ts-expect-error
                                    teamArray[match.player1].team
                                  }
                                </div>
                                <div className='player-name'>
                                  {
                                    // @ts-expect-error
                                    teamArray[match.player1].discord
                                  }
                                </div>
                              </div>
                              <div className='player-score-container'>
                                {match.score !== '0-0' ? (
                                  <div className='player-schedule-score'>
                                    {match.score.charAt(0)}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Link>
                            <Link
                              className='player-team'
                              href={`/offseason-2/teams/${match.player2}`}>
                              <img
                                className='player-team-image'
                                // @ts-expect-error
                                src={teamArray[match.player2].picture}
                                width={50}
                                height={50}
                                // @ts-expect-error
                                alt={teamArray[match.player2].discord}
                              />
                              <div className='player-name-container'>
                                <div className='player-team-name'>
                                  {
                                    // @ts-expect-error
                                    teamArray[match.player2].team
                                  }
                                </div>
                                <div className='player-name'>
                                  {
                                    // @ts-expect-error
                                    teamArray[match.player2].discord
                                  }
                                </div>
                              </div>
                              <div className='player-score-container'>
                                {match.score !== '0-0' ? (
                                  <div className='player-schedule-score'>
                                    {match.score.charAt(2)}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            )}
          </Fragment>
        );
      })}
    </main>
  );
}
