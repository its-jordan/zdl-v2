import tera from './tera.json';

const checkTera: { [key: string]: boolean } = tera;

export function returnTera(pokemonName: string): boolean {
  const normalizedName = pokemonName.toLowerCase();
  return checkTera[normalizedName] || false;
}
