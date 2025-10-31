import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    access_code: '',
    description: '',
    price_per_photo: '10.00',
    is_active: true,
  });

  const generateCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      access_code: formData.access_code || generateCode(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...formData,
          price_per_photo: parseFloat(formData.price_per_photo),
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      navigate(`/admin/events/${data.id}`);
    } catch (err: any) {
      alert('Failed to create event: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

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

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Create New Event</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Event Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Access Code *</label>
              <input
                type="text"
                required
                value={formData.access_code}
                onChange={(e) => setFormData({ ...formData, access_code: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price per Photo ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price_per_photo}
                onChange={(e) => setFormData({ ...formData, price_per_photo: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
}
