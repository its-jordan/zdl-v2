import rosters from './rosters.json';
import { usePathname } from 'next/navigation';

export const teamArray = {
  'lupa.mai': {
    name: 'Lupa',
    team: 'Lupa',
    pokemon: rosters['lupa.mai'],
    discord: 'lupa.mai',
    showdown: 'the jazzy ursaring',
    picture: '/images/teams/season-3/lupamai.png',
  },
  seanboyq: {
    name: 'Sean',
    team: 'Lopunny heaven 🐇',
    pokemon: rosters.seanboyq,
    discord: 'seanboyq',
    showdown: 'SeanBoyQ',
    picture: '/images/teams/season-3/seanboyq.png',
  },
  beachwatch: {
    name: 'Lars',
    team: 'El Paso Texas Glooms',
    pokemon: rosters.beachwatch,
    discord: 'beachwatch',
    showdown: 'brickneyspears',
    picture: '/images/teams/season-3/beachwatch.jpg',
  },
  c0c0_: {
    name: 'Tristan',
    team: 'Clown Central',
    pokemon: rosters.c0c0_,
    discord: 'c0c0_',
    showdown: 'Wishmaker01',
    picture: '/images/teams/season-3/c0c0_.jpg',
  },
  dtbaggins: {
    name: 'Lakeland',
    team: 'Lakeland Porters',
    pokemon: rosters.dtbaggins,
    discord: 'dtbaggins',
    showdown: 'DTBaggins',
    picture: '/images/teams/season-3/dtbaggins.jpg',
  },
  revelreloaded: {
    name: 'Mark',
    team: 'NY Yampers',
    pokemon: rosters.revelreloaded,
    discord: 'revelreloaded',
    showdown: '2016 waves',
    picture: '/images/teams/season-3/revelreloaded.jpg',
  },
  its_jordan: {
    name: 'Jordan',
    team: 'Machampz',
    pokemon: rosters.its_jordan,
    discord: 'its_jordan',
    showdown: 'ceolyfestyle',
    picture: '/images/teams/season-3/its_jordan.png',
  },
  ifurgat: {
    name: 'Jakob',
    team: '$CAMMED',
    pokemon: rosters.ifurgat,
    discord: 'ifurgat',
    showdown: 'ifurgat',
    picture: '/images/teams/season-3/ifurgat.png',
  },
  resolamxxy: {
    name: 'Max',
    team: 'Mind if we smoke? 😤',
    pokemon: rosters.resolamxxy,
    discord: 'resolamxxy',
    showdown: 'resolamxxy',
    picture: '/images/teams/season-3/resolamxxy.png',
  },
  tokotoro: {
    name: 'Jackson',
    team: 'Catpost Co.',
    pokemon: rosters.tokotoro,
    discord: 'tokotoro',
    showdown: 't0kotoro',
    picture: '/images/teams/season-3/tokotoro.jpg',
  },
  thanabros: {
    name: 'Ben',
    team: 'The Drizzlers',
    pokemon: rosters.thanabros,
    discord: 'thanabros',
    showdown: 'THANABR0S',
    picture: '/images/teams/season-3/thanabros.png',
  },
  'zfr.': {
    name: 'Alana',
    team: 'Piplup Party',
    pokemon: rosters.zfr,
    discord: 'zfr.',
    showdown: 'zfr',
    picture: '/images/teams/season-3/zfr..png',
  },
};

export const teamArrayMappable = [
  {
    name: 'Lupa',
    team: 'Lupa',
    pokemon: rosters['lupa.mai'],
    discord: 'lupa.mai',
    showdown: 'the jazzy ursaring',
    picture: '/images/teams/season-3/lupamai.png',
  },
  {
    name: 'Sean',
    team: 'Lopunny heaven 🐇',
    pokemon: rosters.seanboyq,
    discord: 'seanboyq',
    showdown: 'SeanBoyQ',
    picture: '/images/teams/season-3/seanboyq.png',
  },
  {
    name: 'Lars',
    team: 'El Paso Texas Glooms',
    pokemon: rosters.beachwatch,
    discord: 'beachwatch',
    showdown: 'brickneyspears',
    picture: '/images/teams/season-3/beachwatch.jpg',
  },
  {
    name: 'Tristan',
    team: 'Clown Central',
    pokemon: rosters.c0c0_,
    discord: 'c0c0_',
    showdown: 'Wishmaker01',
    picture: '/images/teams/season-3/c0c0_.jpg',
  },
  {
    name: 'Lakeland',
    team: 'Lakeland Porters',
    pokemon: rosters.dtbaggins,
    discord: 'dtbaggins',
    showdown: 'DTBaggins',
    picture: '/images/teams/season-3/dtbaggins.jpg',
  },
  {
    name: 'Mark',
    team: 'NY Yampers',
    pokemon: rosters.revelreloaded,
    discord: 'revelreloaded',
    showdown: '2016 waves',
    picture: '/images/teams/season-3/revelreloaded.jpg',
  },
  {
    name: 'Jordan',
    team: 'Machampz',
    pokemon: rosters.its_jordan,
    discord: 'its_jordan',
    showdown: 'ceolyfestyle',
    picture: '/images/teams/season-3/its_jordan.png',
  },
  {
    name: 'Jakob',
    team: '$CAMMED',
    pokemon: rosters.ifurgat,
    discord: 'ifurgat',
    showdown: 'ifurgat',
    picture: '/images/teams/season-3/ifurgat.png',
  },
  {
    name: 'Max',
    team: 'Mind if we smoke? 😤',
    pokemon: rosters.resolamxxy,
    discord: 'resolamxxy',
    showdown: 'resolamxxy',
    picture: '/images/teams/season-3/resolamxxy.png',
  },
  {
    name: 'Jackson',
    team: 'Catpost Co.',
    pokemon: rosters.tokotoro,
    discord: 'tokotoro',
    showdown: 't0kotoro',
    picture: '/images/teams/season-3/tokotoro.jpg',
  },
  {
    name: 'Ben',
    team: 'The Drizzlers',
    pokemon: rosters.thanabros,
    discord: 'thanabros',
    showdown: 'THANABR0S',
    picture: '/images/teams/season-3/thanabros.png',
  },
  {
    name: 'Alana',
    team: 'Piplup Party',
    pokemon: rosters.zfr,
    discord: 'zfr.',
    showdown: 'zfr',
    picture: '/images/teams/season-3/zfr..png',
  },
];

export default function Teams() {
  const e = usePathname().replace('/season-3/teams/', '');
  function returnPathTextArray() {
    if (e == 'lupa.mai') {
      const array = teamArray[`lupa.mai`];
      return array.pokemon;
    } else if (e == 'seanboyq') {
      const array = teamArray.seanboyq;
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
    } else if (e == 'thanabros') {
      const array = teamArray.thanabros;
      return array.pokemon;
    } else if (e == 'zfr.') {
      const array = teamArray['zfr.'];
      return array.pokemon;
    } else {
      const array = teamArray.tokotoro;
      return array.pokemon;
    }
  }

  return returnPathTextArray;
}
