import Image from 'next/image';

export default function Home() {
  return (
    <main className='home-container'>
      <img
        src='/images/rayquaza-jordans.png'
        alt='Rayquaza Jordans'
        width={900}
        height={900}
      />
    </main>
  );
}
