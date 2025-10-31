import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

type FloatingCartProps = {
  pricePerPhoto: number;
  onCheckout: () => void;
};

export function FloatingCart({ pricePerPhoto, onCheckout }: FloatingCartProps) {
  const { count } = useCart();

  if (count === 0) return null;

  const total = count * pricePerPhoto;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onCheckout}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all transform hover:scale-105"
      >
        <ShoppingCart className="w-5 h-5" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">{count} {count === 1 ? 'photo' : 'photos'}</span>
          <span className="text-xs opacity-90">${total.toFixed(2)}</span>
        </div>
      </button>
    </div>
  );
}
