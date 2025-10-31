import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download as DownloadIcon, Lock, CheckCircle } from 'lucide-react';
import { supabase, Order, Photo } from '../lib/supabase';

export function Download() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const { data, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (orderError) throw orderError;
      if (!data) throw new Error('Order not found');

      setOrder(data);

      if (data.payment_method === 'online' && data.payment_status === 'completed') {
        setUnlocked(true);
        await loadPhotos(data.photo_ids);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async (photoIds: string[]) => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .in('id', photoIds);

      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      console.error('Failed to load photos:', err);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    if (password === order.download_password) {
      setUnlocked(true);
      setError('');
      await loadPhotos(order.photo_ids);

      await supabase
        .from('orders')
        .update({
          payment_status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', order.id);
    } else {
      setError('Invalid password. Please contact the photographer.');
    }
  };

  const handleDownload = async (photo: Photo) => {
    try {
      await supabase
        .from('download_logs')
        .insert({
          order_id: orderId,
          photo_id: photo.id,
        });

      window.open(photo.full_url, '_blank');
    } catch (err) {
      console.error('Failed to log download:', err);
    }
  };

  const handleDownloadAll = async () => {
    if (!order) return;

    photos.forEach(photo => {
      handleDownload(photo);
    });
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

  if (error && !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Enter Download Password</h1>
              <p className="text-gray-600">
                Please enter the password provided by the photographer after payment confirmation
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Unlock Downloads
              </button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500 text-center">
                Order ID: {order.id.slice(0, 8)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Your Photos</h1>
            <button
              onClick={handleDownloadAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <DownloadIcon className="w-4 h-4" />
              Download All
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">Payment Confirmed</h3>
            <p className="text-sm text-green-800">
              Your order is complete. Download your high-resolution photos below.
            </p>
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading photos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={photo.thumbnail_url}
                    alt={photo.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 truncate">{photo.filename}</p>
                  <button
                    onClick={() => handleDownload(photo)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
