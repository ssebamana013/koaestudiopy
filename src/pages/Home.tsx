import { useEffect, useState } from 'react';
import { Camera, Calendar, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { supabase, Event } from '../lib/supabase';

export function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Camera className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-7xl font-bold mb-2 tracking-tight">
            KOA
          </h1>
          <p className="text-xl text-gray-400 mb-2">Estudio Multimedia</p>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">
            {t.home.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No events available at the moment.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Available Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="group cursor-pointer bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-600 transition-all duration-300 hover:scale-105"
                >
                  {event.cover_photo_url ? (
                    <div className="relative h-48 bg-gray-900 overflow-hidden">
                      <img
                        src={event.cover_photo_url}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <Image className="w-16 h-16 text-gray-600" />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      {event.event_date && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                      )}

                      <div className="text-blue-400 font-semibold">
                        ${event.price_per_photo.toFixed(2)}/photo
                      </div>
                    </div>

                    {event.total_photos > 0 && (
                      <div className="mt-3 text-xs text-gray-500">
                        {event.total_photos} photos available
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 KOA Estudio Multimedia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
