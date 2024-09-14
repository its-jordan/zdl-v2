import { splitMoveName } from './nameSplit';
import moves from '@/data/pokemon/commonMoves.json';

interface PokemonMove {
  move: {
    name: string;
  };
}

interface PokemonData {
  moves: PokemonMove[];
}

async function hasMove(
  pokemonName: string,
  moveName: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PokemonData = await response.json();

    const hasStickyWeb = data.moves.some((move) => move.move.name === moveName);

    return hasStickyWeb;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return false;
  }
}

export async function moveTest(pokemon: string, move: string) {
  if ((await hasMove(pokemon, move)) == true) {
    return <div className='card-move'>{splitMoveName(move)}</div>;
  } else {
    return;
  }
}

export default function moveCheck(pokemon: string) {
  const header = 'Moves';

  return (
    <>
      <div className='card-header'>{header}</div>
      <div className='card-moves'>
        {moves.map((move) => {
          return <>{moveTest(pokemon, move)}</>;
        })}
      </div>
    </>
  );
}
