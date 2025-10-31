import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Key } from 'lucide-react';
import { supabase, Event, Photo } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';

export function Checkout() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { selectedPhotos } = useCart();
  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('online');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (selectedPhotos.size === 0) {
      navigate('/');
      return;
    }
    loadData();
  }, [eventId]);

  const loadData = async () => {
    try {
      setLoading(true);

      const { data: eventData, error: eventError} = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .maybeSingle();

      if (eventError) throw eventError;
      if (!eventData) throw new Error('Event not found');

      setEvent(eventData);

      const { data: photosData, error: photosError } = await supabase
        .from('photos')
        .select('*')
        .in('id', Array.from(selectedPhotos));

      if (photosError) throw photosError;
      setPhotos(photosData || []);
    } catch (err) {
      console.error('Failed to load checkout data:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          event_id: event.id,
          client_email: formData.email,
          client_name: formData.name,
          photo_ids: Array.from(selectedPhotos),
          total_amount: selectedPhotos.size * event.price_per_photo,
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'online' ? 'pending' : 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      if (paymentMethod === 'online') {
        navigate(`/payment/${data.id}`);
      } else {
        navigate(`/download/${data.id}`);
      }
    } catch (err: any) {
      alert('Failed to create order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!event) return null;

  const total = selectedPhotos.size * event.price_per_photo;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Event</span>
                  <span className="font-medium">{event.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Photos Selected</span>
                  <span className="font-medium">{selectedPhotos.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per Photo</span>
                  <span className="font-medium">${event.price_per_photo.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-3">Selected Photos</h3>
              <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.thumbnail_url}
                    alt={photo.filename}
                    className="w-full aspect-square object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'online'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">Pay Online</div>
                        <div className="text-sm text-gray-600">Instant download after payment</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('offline')}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'offline'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">I Already Paid</div>
                        <div className="text-sm text-gray-600">Enter password to download</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {submitting ? 'Processing...' : paymentMethod === 'online' ? 'Continue to Payment' : 'Continue to Download'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
