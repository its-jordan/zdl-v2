import rosters from '@/data/offseason-2/rosters.json';
import { usePathname } from 'next/navigation';

export const teamArray = {
  'lupa.mai': {
    name: 'Lupa',
    team: 'Fairview Floatzels',
    pokemon: rosters['lupa.mai'],
    discord: 'lupa.mai',
    showdown: 'the jazzy ursaring',
    picture: '/images/teams/lupamai.png',
  },
  jaegerpods: {
    name: 'Nick',
    team: 'My Name is Jeff',
    pokemon: rosters.jaegerpods,
    discord: 'jaegerpods',
    showdown: 'Jaegervans',
    picture: '/images/teams/jaegerpods.jpg',
  },
  seanboyq: {
    name: 'Sean',
    team: 'Rayquaza Jordans',
    pokemon: rosters.seanboyq,
    discord: 'seanboyq',
    showdown: 'SeanBoyQ',
    picture: '/images/teams/seanboyq.png',
  },
  danknett: {
    name: 'Jake',
    team: 'The Thugshadows',
    pokemon: rosters.danknett,
    discord: 'danknett',
    showdown: 'pweenween',
    picture: '/images/teams/danknett.png',
  },
  beachwatch: {
    name: 'Lars',
    team: 'El Paso Texas Glooms',
    pokemon: rosters.beachwatch,
    discord: 'beachwatch',
    showdown: 'brickneyspears',
    picture: '/images/teams/beachwatch.jpg',
  },
  c0c0_: {
    name: 'Tristan',
    team: 'Clown Central',
    pokemon: rosters.c0c0_,
    discord: 'c0c0_',
    showdown: 'Wishmaker01',
    picture: '/images/teams/c0c0_.jpg',
  },
  dtbaggins: {
    name: 'Jon',
    team: 'Fe Legion',
    pokemon: rosters.dtbaggins,
    discord: 'dtbaggins',
    showdown: 'DTBaggins',
    picture: '/images/teams/dtbaggins.png',
  },
  revelreloaded: {
    name: 'Mark',
    team: 'NY Yampers',
    pokemon: rosters.revelreloaded,
    discord: 'revelreloaded',
    showdown: '2016 waves',
    picture: '/images/teams/revelreloaded.jpg',
  },
  its_jordan: {
    name: 'Jordan',
    team: 'OMGVAMPSANDPIPLUPARESOKAWAII🦇',
    pokemon: rosters.its_jordan,
    discord: 'its_jordan',
    showdown: 'doomedschultze',
    picture: '/images/teams/its_jordan.png',
  },
  ifurgat: {
    name: 'Jakob',
    team: 'i was just squidding',
    pokemon: rosters.ifurgat,
    discord: 'ifurgat',
    showdown: 'ifurgat',
    picture: '/images/teams/ifurgat.jpg',
  },
  resolamxxy: {
    name: 'Max',
    team: 'Pristine Art 🤤',
    pokemon: rosters.resolamxxy,
    discord: 'resolamxxy',
    showdown: 'resolamxxy',
    picture: '/images/teams/resolamxxy.png',
  },
  tokotoro: {
    name: 'Jackson',
    team: 'Catpost Corral',
    pokemon: rosters.tokotoro,
    discord: 'tokotoro',
    showdown: 't0kotoro',
    picture: '/images/teams/tokotoro.jpg',
  },
};

export const teamArrayMappable = [
  {
    name: 'Lupa',
    team: 'Fairview Floatzels',
    pokemon: rosters['lupa.mai'],
    discord: 'lupa.mai',
    showdown: 'the jazzy ursaring',
    picture: '/images/teams/lupamai.png',
  },
  {
    name: 'Nick',
    team: 'My Name is Jeff',
    pokemon: rosters.jaegerpods,
    discord: 'jaegerpods',
    showdown: 'Jaegervans',
    picture: '/images/teams/jaegerpods.jpg',
  },
  {
    name: 'Sean',
    team: 'Rayquaza Jordans',
    pokemon: rosters.seanboyq,
    discord: 'seanboyq',
    showdown: 'SeanBoyQ',
    picture: '/images/teams/seanboyq.png',
  },
  {
    name: 'Jake',
    team: 'The Thugshadows',
    pokemon: rosters.danknett,
    discord: 'danknett',
    showdown: 'pweenween',
    picture: '/images/teams/danknett.png',
  },
  {
    name: 'Lars',
    team: 'El Paso Texas Glooms',
    pokemon: rosters.beachwatch,
    discord: 'beachwatch',
    showdown: 'brickneyspears',
    picture: '/images/teams/beachwatch.jpg',
  },
  {
    name: 'Tristan',
    team: 'Clown Central',
    pokemon: rosters.c0c0_,
    discord: 'c0c0_',
    showdown: 'Wishmaker01',
    picture: '/images/teams/c0c0_.jpg',
  },
  {
    name: 'Jon',
    team: 'Fe Legion',
    pokemon: rosters.dtbaggins,
    discord: 'dtbaggins',
    showdown: 'DTBaggins',
    picture: '/images/teams/dtbaggins.png',
  },
  {
    name: 'Mark',
    team: 'NY Yampers',
    pokemon: rosters.revelreloaded,
    discord: 'revelreloaded',
    showdown: '2016 waves',
    picture: '/images/teams/revelreloaded.jpg',
  },
  {
    name: 'Jordan',
    team: 'OMGVAMPSANDPIPLUPARESOKAWAII🦇',
    pokemon: rosters.its_jordan,
    discord: 'its_jordan',
    showdown: 'doomedschultze',
    picture: '/images/teams/its_jordan.png',
  },
  {
    name: 'Jakob',
    team: 'i was just squidding',
    pokemon: rosters.ifurgat,
    discord: 'ifurgat',
    showdown: 'ifurgat',
    picture: '/images/teams/ifurgat.jpg',
  },
  {
    name: 'Max',
    team: 'Pristine Art 🤤',
    pokemon: rosters.resolamxxy,
    discord: 'resolamxxy',
    showdown: 'resolamxxy',
    picture: '/images/teams/resolamxxy.png',
  },
  {
    name: 'Jackson',
    team: 'Catpost Corral',
    pokemon: rosters.tokotoro,
    discord: 'tokotoro',
    showdown: 't0kotoro',
    picture: '/images/teams/tokotoro.jpg',
  },
];

export default function Teams() {
  const e = usePathname().replace('/offseason-2/teams/', '');
  function returnPathTextArray() {
    if (e == 'lupa.mai') {
      const array = teamArray[`lupa.mai`];
      return array.pokemon;
    } else if (e == 'jaegerpods') {
      const array = teamArray.jaegerpods;
      return array.pokemon;
    } else if (e == 'seanboyq') {
      const array = teamArray.seanboyq;
      return array.pokemon;
    } else if (e == 'danknett') {
      const array = teamArray.danknett;
      return array.pokemon;
    } else if (e == 'beachwatch') {
      const array = teamArray.beachwatch;
      return array.pokemon;
    } else if (e == 'c0c0_') {
      const array = teamArray.c0c0_;
      return array.pokemon;
    } else if (e == 'dtbaggins') {
      const array = teamArray.dtbaggins;
      return array.pokemon;
    } else if (e == 'revelreloaded') {
      const array = teamArray.revelreloaded;
      return array.pokemon;
    } else if (e == 'its_jordan') {
      const array = teamArray.its_jordan;
      return array.pokemon;
    } else if (e == 'ifurgat') {
      const array = teamArray.ifurgat;
      return array.pokemon;
    } else if (e == 'resolamxxy') {
      const array = teamArray.resolamxxy;
      return array.pokemon;
    } else if (e == 'tokotoro') {
      const array = teamArray.tokotoro;
      return array.pokemon;
    } else {
      const array = teamArray.tokotoro;
      return array.pokemon;
    }
  }

  return returnPathTextArray;
}
