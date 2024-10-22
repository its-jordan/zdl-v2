import PokemonTeamComparison from '@/data/offseason-2/pokemon-team-comparison';

export default function Compare() {
  return (
    <main className='mt-20'>
      <div className='comparison grid grid-cols-1 justify-center items-center'>
        <PokemonTeamComparison></PokemonTeamComparison>
      </div>
    </main>
  );
}
