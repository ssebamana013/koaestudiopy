import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type CartContextType = {
  selectedPhotos: Set<string>;
  togglePhoto: (photoId: string) => void;
  clearSelection: () => void;
  selectAll: (photoIds: string[]) => void;
  isSelected: (photoId: string) => boolean;
  count: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('selectedPhotos');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('selectedPhotos', JSON.stringify(Array.from(selectedPhotos)));
  }, [selectedPhotos]);

  const togglePhoto = (photoId: string) => {
    setSelectedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
      } else {
        next.add(photoId);
      }
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedPhotos(new Set());
    localStorage.removeItem('selectedPhotos');
  };

  const selectAll = (photoIds: string[]) => {
    setSelectedPhotos(new Set(photoIds));
  };

  const isSelected = (photoId: string) => {
    return selectedPhotos.has(photoId);
  };

  return (
    <CartContext.Provider value={{
      selectedPhotos,
      togglePhoto,
      clearSelection,
      selectAll,
      isSelected,
      count: selectedPhotos.size
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
