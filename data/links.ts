import { teamArrayMappable } from '@/data/offseason-2/teams';

const teamArrays = {
  'offseason-2': teamArrayMappable,
  'season-3': teamArrayMappable,
};

const navLinksSeasons = (season: string) => {
  // @ts-expect-error
  const teams = teamArrays[season];
  const Array = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Scores',
      path: `/${season}/scores`,
    },
    {
      title: 'Teams',
      path: `/${season}/teams`,
      subpaths: teams.map((team: any) => ({
        title: team.name,
        path: `/${season}/teams/${team.discord}`,
        discord: team.discord,
        showdown: team.showdown,
        avatar: team.picture,
        name: team.team,
      })),
    },
    {
      title: 'Standings',
      path: `/${season}/standings`,
    },
    {
      title: 'Pokémon',
      path: `/${season}/pokemon`,
    },
    {
      title: 'Stats',
      path: `/${season}/stats`,
    },
    {
      title: 'Trades',
      path: `/${season}/trades`,
    },
    { title: 'Compare Pokémon', path: `/${season}/compare` },
  ];
  return Array;
};

export const seasonLinks = [
  { value: 'offseason-2', title: 'Offseason 2', disabled: false },
  { value: 'season-3', title: 'Season 3', disabled: true },
];

export const currentSeason = seasonLinks[0].title;

export default navLinksSeasons;
