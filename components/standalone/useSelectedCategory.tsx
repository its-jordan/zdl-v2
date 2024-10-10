'use client';

import { seasonLinks } from '@/data/links';
import { useState, useEffect } from 'react';

type NavigationCategory = (typeof seasonLinks)[number]['value'];

export default function useSelectedCategory() {
  const [selectedCategory, setSelectedCategory] = useState<NavigationCategory>(
    () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('selectedCategory');
        return (saved as NavigationCategory) || 'offseason-2';
      }
      return 'offseason-2';
    }
  );

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  return { selectedCategory, setSelectedCategory };
}
