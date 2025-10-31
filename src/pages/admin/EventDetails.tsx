import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Key } from 'lucide-react';
import { supabase, Event, Order } from '../../lib/supabase';

export function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [eventId]);

  const loadData = async () => {
    try {
      const [eventRes, ordersRes] = await Promise.all([
        supabase.from('events').select('*').eq('id', eventId).maybeSingle(),
        supabase.from('orders').select('*').eq('event_id', eventId).order('created_at', { ascending: false }),
      ]);

      if (eventRes.data) setEvent(eventRes.data);
      if (ordersRes.data) setOrders(ordersRes.data);
    } catch (err) {
      console.error('Failed to load event:', err);
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = async (orderId: string) => {
    const password = Math.random().toString(36).substring(2, 10).toUpperCase();
    await supabase.from('orders').update({ download_password: password }).eq('id', orderId);
    alert(`Password: ${password}`);
    loadData();
  };

  if (loading || !event) {
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
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="text-sm text-gray-600">
            <span>Code: {event.access_code}</span> · <span>${event.price_per_photo}/photo</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Orders ({orders.length})</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{order.client_name || order.client_email}</h3>
                      <p className="text-sm text-gray-600">{order.photo_ids.length} photos · ${order.total_amount}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.payment_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.payment_status}
                    </span>
                  </div>
                  {order.payment_method === 'offline' && !order.download_password && (
                    <button
                      onClick={() => generatePassword(order.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Key className="w-4 h-4" />
                      Generate Password
                    </button>
                  )}
                  {order.download_password && (
                    <div className="bg-green-50 p-2 rounded mt-2">
                      <p className="text-sm">Password: <span className="font-mono">{order.download_password}</span></p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
