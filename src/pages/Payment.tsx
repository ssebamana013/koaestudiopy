import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, QrCode } from 'lucide-react';
import { supabase, Order } from '../lib/supabase';

export function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Order not found');

      setOrder(data);
    } catch (err) {
      console.error('Failed to load order:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!order) return;

    setConfirming(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', order.id);

      if (error) throw error;

      navigate(`/download/${order.id}`);
    } catch (err: any) {
      alert('Failed to confirm payment: ' + err.message);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment</h1>
            <p className="text-gray-600">Scan QR code to complete payment</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="aspect-square bg-white rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-gray-400">
                <QrCode className="w-32 h-32 mx-auto mb-2" />
                <p className="text-sm">QR Code Placeholder</p>
                <p className="text-xs">Integrate with payment provider</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">${order.total_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Photos</span>
                <span className="font-semibold">{order.photo_ids.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              💡 After completing the payment, click the button below to access your downloads.
            </p>
          </div>

          <button
            onClick={handleConfirmPayment}
            disabled={confirming}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {confirming ? 'Confirming...' : 'I Have Completed Payment'}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            Order ID: {order.id.slice(0, 8)}...
          </p>
        </div>
      </div>
    </div>
  );
}
