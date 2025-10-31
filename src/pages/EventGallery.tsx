import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, CheckSquare, Square } from 'lucide-react';
import { supabase, Event, Photo } from '../lib/supabase';
import { PhotoGallery } from '../components/PhotoGallery';
import { FloatingCart } from '../components/FloatingCart';
import { useCart } from '../contexts/CartContext';

export function EventGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { count, selectAll, clearSelection, selectedPhotos } = useCart();
  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError('');

      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (eventError) throw eventError;
      if (!eventData) {
        setError('Event not found or access denied');
        return;
      }

      setEvent(eventData);

      const { data: photosData, error: photosError } = await supabase
        .from('photos')
        .select('*')
        .eq('event_id', eventData.id)
        .order('position', { ascending: true });

      if (photosError) throw photosError;
      setPhotos(photosData || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedPhotos.size === photos.length) {
      clearSelection();
    } else {
      selectAll(photos.map(p => p.id));
    }
  };

  const handleCheckout = () => {
    navigate(`/checkout/${event?.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {selectedPhotos.size === photos.length ? (
                  <CheckSquare className="w-5 h-5" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">
                  {selectedPhotos.size === photos.length ? 'Deselect All' : 'Select All'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {event.cover_photo_url && (
        <div className="relative h-64 md:h-96 bg-gray-900 overflow-hidden">
          <img
            src={event.cover_photo_url}
            alt={event.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                {event.event_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>${event.price_per_photo.toFixed(2)} per photo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {!event.cover_photo_url && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h1>
            {event.description && (
              <p className="text-gray-600 mb-4">{event.description}</p>
            )}
            <div className="flex flex-wrap gap-4 text-gray-600">
              {event.event_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.event_date).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>${event.price_per_photo.toFixed(2)} per photo</span>
              </div>
            </div>
          </div>
        )}

        {count > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-900 text-sm">
              {count} {count === 1 ? 'photo' : 'photos'} selected · Total: ${(count * event.price_per_photo).toFixed(2)}
            </p>
          </div>
        )}

        {photos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No photos available for this event yet.</p>
          </div>
        ) : (
          <PhotoGallery photos={photos} />
        )}
      </div>

      <FloatingCart pricePerPhoto={event.price_per_photo} onCheckout={handleCheckout} />
    </div>
  );
}
