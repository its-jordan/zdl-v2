import { teamArrayMappable as offseason2 } from '@/data/offseason-2/teams';
import { teamArrayMappable as season3 } from '@/data/season-3/teams';

const teamArrays = {
  'offseason-2': offseason2,
  'season-3': season3,
};

const seasons = ['offseason-2', 'season-3'];

export const seasonLinks = seasons.map((season, index) => ({
  value: season,
  title: season
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
  disabled: index > 1 ? true : false,
}));

export const currentSeasonValue = seasonLinks[1].value;
export const currentSeason = seasonLinks[0].title;
export const currentWeek = 1;

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
      path: `/pokemon`,
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

// export const tradesActive = () => {
//   if (currentSeasonValue && currentWeek <= 4) {
//     return false;
//   }
//   return true;
// };

export default navLinksSeasons;
