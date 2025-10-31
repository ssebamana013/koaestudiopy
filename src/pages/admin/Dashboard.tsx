import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Camera, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Event } from '../../lib/supabase';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    loadEvents();
  }, [user]);

  const loadEvents = async () => {
    try {
      const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (data) setEvents(data);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">KOA Estudio Admin</h1>
            <button onClick={handleSignOut} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Events</h2>
          <button
            onClick={() => navigate('/admin/events/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events yet</h3>
            <button
              onClick={() => navigate('/admin/events/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-4"
            >
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/admin/events/${event.id}`)}
                className="bg-white rounded-xl shadow-sm border overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Code: {event.access_code}</span>
                    <span>${event.price_per_photo}/photo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
