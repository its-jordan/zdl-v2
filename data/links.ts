import { teamArrayMappable } from '@/data/offseason-2/teams';

const navLinks = {
  'offseason-2': [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Scores',
      path: '/offseason-2/scores',
    },
    {
      title: 'Teams',
      path: '/offseason-2/teams',
      subpaths: teamArrayMappable.map((team) => ({
        title: team.name,
        path: `/offseason-2/teams/${team.discord}`,
        discord: team.discord,
        showdown: team.showdown,
        avatar: team.picture,
        name: team.team,
      })),
    },
    {
      title: 'Standings',
      path: '/offseason-2/standings',
    },
    {
      title: 'Pokémon',
      path: '/offseason-2/pokemon',
    },
    {
      title: 'Trades',
      path: '/offseason-2/trades',
    },
    { title: 'Compare Pokémon', path: '/offseason-2/compare' },
  ],
};

export const seasonLinks = [
  { value: 'offseason-2', title: 'Offseason 2', disabled: false },

  // { value: 'season-1', title: 'Season 1', disabled: true },
  // { value: 'offseason-1', title: 'Offseason 1', disabled: true },
  // { value: 'season-2', title: 'Season 2', disabled: true },
  // { value: 'season-3', title: 'Season 3', disabled: true },
];
export const currentSeason = seasonLinks[0].title;

export default navLinks;
