export function nameSplit(e: string) {
  if (e == 'farfetchd-galar') {
    return "Galarian Farfetch'd";
  } else if (e.includes('arceus-')) {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      ' ' +
      '(' +
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1) +
      ')'
    }`;
  } else if (e == 'ting-lu') {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      '-' +
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1)
    }`;
  } else if (e == 'eiscue-ice') {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      '-' +
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1)
    }`;
  } else if (
    e.includes('iron-') ||
    e.includes('tapu-') ||
    e.includes('raging-') ||
    e.includes('-therian') ||
    e.includes('-wake') ||
    e.includes('-moon') ||
    e.includes('-small') ||
    e.includes('-average') ||
    e.includes('-large') ||
    e.includes('-super') ||
    e.includes('-defense') ||
    e.includes('-speed') ||
    e.includes('-tusk') ||
    e.includes('-fire') ||
    e.includes('-sky') ||
    e.includes('-bloodmoon') ||
    e.includes('-mane') ||
    e.includes('-complete') ||
    e.includes('-crowned') ||
    e.includes('-shocks') ||
    e.includes('-white') ||
    e.includes('-black')
  ) {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      ' ' +
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1)
    }`;
  } else if (e.includes('galar') == true) {
    return `${
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1).concat('ian')
    } ${' '} ${
      e.split('-')[0].charAt(0).toUpperCase() + e.split('-')[0].slice(1)
    }`;
  } else if (e.includes('50')) {
    return `${e.replace('-50', '')}`;
  } else if (e.includes('-mega')) {
    return `${
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1) +
      ' ' +
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1)
    }`;
  } else if (e.includes('alola') == true) {
    return `${
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1)?.concat('n')
    } ${
      ' ' + e.split('-')[0].charAt(0).toUpperCase() + e.split('-')[0].slice(1)
    }`;
  } else if (e.includes('hisui') == true) {
    return `${
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1)?.concat('an')
    } ${
      ' ' + e.split('-')[0].charAt(0).toUpperCase() + e.split('-')[0].slice(1)
    }`;
  } else if (e.includes('paldea') == true) {
    return `${
      e.split('-')[1].charAt(0).toUpperCase() +
      e.split('-')[1].slice(1)?.concat('n')
    } ${
      ' ' + e.split('-')[0].charAt(0).toUpperCase() + e.split('-')[0].slice(1)
    }`;
  } else if (e.includes('blade') == true) {
    return `${e.split('-')[0]}`;
  } else if (e.includes('rotom-') == true) {
    return `${
      e.split('-')[1].charAt(0).toUpperCase() + e.split('-')[1].slice(1)
    } ${
      ' ' + e.split('-')[0].charAt(0).toUpperCase() + e.split('-')[0].slice(1)
    }`;
  } else if (e.includes('incarnate') == true) {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() + e.split('-')[0].slice(1)
    }`;
  } else if (e.includes('-fini') == true) {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      ' Fini'
    }`;
  } else if (e.endsWith('-female')) {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      ' (Female)'
    }`;
  } else if (e.endsWith('-male')) {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      ' (Male)'
    }`;
  } else if (e.includes('-jr') == true) {
    return `${
      e.split('-')[0].charAt(0).toUpperCase() +
      e.split('-')[0].slice(1) +
      ' Jr.'
    }`;
  } else if (e.includes('farfetchd') == true && e.includes('galar') == false) {
    return `${
      e.split('d')[0].charAt(0).toUpperCase() + e.split('d')[0].slice(1) + "'d"
    }`;
  } else {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
}

export function splitMoveName(e: string) {
  return e.includes('-') == true
    ? e.split('-')[0].charAt(0).toUpperCase() +
        e.split('-')[0].slice(1) +
        ' ' +
        e.split('-')[1].charAt(0).toUpperCase() +
        e.split('-')[1].slice(1)
    : e.charAt(0).toUpperCase() + e.slice(1);
}
