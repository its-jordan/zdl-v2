import React from 'react';
import { teamArray } from './teams';
import Link from 'next/link';

type Match = {
  player1: string;
  player2: string;
  score: string;
};

type Schedule = {
  [week: string]: Match[];
};

export default function PlayerSchedule({
  playerName,
  schedule,
}: {
  playerName: string;
  schedule: Schedule;
}) {
  return (
    <div className='player-schedule-container'>
      {Object.entries(schedule).map(([week, matches]) => {
        const playerMatch = matches.find(
          (match) =>
            match.player1 === playerName || match.player2 === playerName
        );

        return (
          <div key={week} className='player-schedule-week'>
            {playerMatch ? (
              <div className='player-schedule-match'>
                <div className='player-schedule-info'>
                  <div className='player-schedule-teams'>
                    <Link
                      href={`/offseason-2/teams/${
                        // @ts-ignore
                        teamArray[playerMatch.player1].discord
                      }`}
                      className='player-team'>
                      <img
                        className='player-team-image'
                        // @ts-ignore
                        src={teamArray[playerMatch.player1].picture}
                        width={50}
                        height={50}
                        // @ts-ignore
                        alt={teamArray[playerMatch.player1].discord}
                      />
                      <div className='player-name-container'>
                        <div className='player-team-name'>
                          {
                            // @ts-ignore
                            teamArray[playerMatch.player1].team
                          }
                        </div>
                        <div className='player-name'>
                          {
                            // @ts-ignore
                            teamArray[playerMatch.player1].discord
                          }
                        </div>
                      </div>
                      <div className='player-score-container'>
                        {playerMatch.score !== '0-0' ? (
                          <div className='player-schedule-score'>
                            {playerMatch.score.charAt(0)}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                    <Link
                      href={`/offseason-2/teams/${
                        // @ts-ignore
                        teamArray[playerMatch.player2].discord
                      }`}
                      className={`player-team ${
                        playerMatch.player2 === playerName
                          ? 'current-player'
                          : ''
                      }`}>
                      <img
                        className='player-team-image'
                        // @ts-ignore
                        src={teamArray[playerMatch.player2].picture}
                        width={50}
                        height={50}
                        // @ts-ignore
                        alt={teamArray[playerMatch.player2].discord}
                      />
                      <div className='player-name-container'>
                        <div className='player-team-name'>
                          {
                            // @ts-ignore
                            teamArray[playerMatch.player2].team
                          }
                        </div>
                        <div className='player-name'>
                          {
                            // @ts-ignore
                            teamArray[playerMatch.player2].discord
                          }
                        </div>
                      </div>
                      <div className='player-score-container'>
                        {playerMatch.score !== '0-0' ? (
                          <div className='player-schedule-score'>
                            {playerMatch.score.charAt(2)}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                    <h2 className='player-schedule-week-header'>
                      <div className='player-week'>
                        {week.charAt(0).toUpperCase() +
                          week.slice(1).replace('-', ' ')}
                      </div>
                      {playerMatch.score !== '0-0' ? (
                        <div className='player-week-result'>Final</div>
                      ) : (
                        <div className='player-week-resul opacity-50'>
                          Not Yet Played
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className='bg-gray-100 shadow-md rounded-lg p-4 text-gray-500'>
                No match scheduled
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
