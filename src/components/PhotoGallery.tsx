import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Photo } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';

type PhotoGalleryProps = {
  photos: Photo[];
};

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const { isSelected, togglePhoto } = useCart();
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        setBlurred(true);
        setTimeout(() => setBlurred(false), 2000);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${blurred ? 'blur-xl' : ''} transition-all duration-300`}>
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => togglePhoto(photo.id)}
        >
          <img
            src={photo.thumbnail_url}
            alt={photo.filename}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-2 left-2 text-white/50 text-xs font-bold tracking-wider select-none pointer-events-none">
            ©KOA
          </div>
          {isSelected(photo.id) && (
            <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          <div className={`absolute inset-0 border-4 transition-opacity ${
            isSelected(photo.id) ? 'border-blue-600 opacity-100' : 'border-transparent opacity-0'
          }`} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-xs truncate">{photo.filename}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
