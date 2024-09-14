import PokemonTeamComparison from '@/components/pokemon-team-comparison';
import PokemonCard from '@/components/standalone/pokemoncard';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='home-container'>
      <Image
        src='/images/rayquaza-jordans.png'
        alt='Rayquaza Jordans'
        width={800}
        height={800}></Image>
    </main>
  );
}
