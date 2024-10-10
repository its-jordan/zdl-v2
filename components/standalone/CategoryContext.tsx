'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useSelectedCategory from '@/components/standalone/useSelectedCategory';
import { seasonLinks } from '@/data/links';

type NavigationCategory = (typeof seasonLinks)[number]['value'];

interface CategoryContextType {
  selectedCategory: NavigationCategory;
  setSelectedCategory: (category: NavigationCategory) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
