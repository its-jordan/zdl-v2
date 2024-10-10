'use client';

import { useCategory } from '@/components/standalone/CategoryContext';

const HomePage = () => {
  const { selectedCategory } = useCategory();

  return (
    <div className='justify-center h-[100vh] w-[100vw] items-center flex'>
      <img
        src={`/images/${selectedCategory}.png`}
        alt='homepage background'
        width={900}
        height={900}
      />
    </div>
  );
};

export default HomePage;
