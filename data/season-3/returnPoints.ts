import points from './pointValues.json';

const pointValues: { [key: string]: number } = points;

export function returnPoints(pokemonName: string): number {
  const normalizedName = pokemonName.toLowerCase();
  return pointValues[normalizedName] || 0;
}
