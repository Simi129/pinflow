import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Navigation';
import { Camera, Plus, Trash2, MousePointer2, Brush } from 'lucide-react';
import { supabase } from '../lib/supabase';
import PinterestConnect from '../components/dashboard/PinterestConnect';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  // Обработка Pinterest OAuth callback
  useEffect(() => {
    const connected = searchParams.get('pinterest_connected');
    const error = searchParams.get('pinterest_error');
    if (connected === 'true') {
      setToast({ type: 'success', msg: 'Pinterest connected successfully! 🎉' });
      setTimeout(() => navigate('/settings', { replace: true }), 1000);
      setTimeout(() => setToast(null), 5000);
    }
    if (error) {
      setToast({ type: 'error', msg: `Failed to connect Pinterest: ${error}` });
      setTimeout(() => navigate('/settings', { replace: true }), 1000);
      setTimeout(() => setToast(null), 5000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar user={user} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`rounded-xl shadow-lg px-5 py-4 text-sm font-medium border ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            {toast.msg}
          </div>
        </div>
      )}

      <main className="flex-1 ml-64 min-h-screen p-8 lg:p-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Account Settings</h1>
          <p className="text-on-surface-variant">Manage your profile, integrations, and application preferences.</p>
        </header>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Vertical Tabs */}
          <div className="col-span-12 lg:col-span-3 space-y-2">
            <button className="w-full text-left px-5 py-3 rounded-xl bg-surface-container-lowest text-primary font-bold shadow-sm transition-all">Profile</button>
            <button className="w-full text-left px-5 py-3 rounded-xl hover:bg-surface-container-low text-on-surface-variant font-medium transition-all">Connections</button>
            <button className="w-full text-left px-5 py-3 rounded-xl hover:bg-surface-container-low text-on-surface-variant font-medium transition-all">Billing</button>
            <button className="w-full text-left px-5 py-3 rounded-xl hover:bg-surface-container-low text-on-surface-variant font-medium transition-all">Notifications</button>
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-8">
            {/* Profile Section */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-on-surface">Public Profile</h2>
                <p className="text-on-surface-variant text-sm">Update your personal information and photo.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white text-4xl font-black">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </button>
                  </div>
                  <p className="mt-4 text-xs font-bold text-primary cursor-pointer hover:underline">Change Photo</p>
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">Display Name</label>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-on-surface outline-none"
                      type="text"
                      defaultValue={user?.user_metadata?.full_name || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">Email Address</label>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface outline-none opacity-60 cursor-not-allowed"
                      type="email"
                      defaultValue={user?.email || ''}
                      disabled
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">Bio</label>
                    <textarea
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 text-on-surface outline-none resize-none"
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Pinterest Connection — реальный компонент */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-on-surface">Connections</h2>
                <p className="text-on-surface-variant text-sm">Manage your linked Pinterest accounts and APIs.</p>
              </div>
              <PinterestConnect />
            </section>

            <div className="flex justify-end gap-4 pb-12">
              <button className="px-8 py-3 rounded-xl border border-outline-variant/15 text-on-surface-variant font-bold hover:bg-surface-container-high transition-all">
                Cancel
              </button>
              <button className="px-8 py-3 rounded-xl primary-gradient text-on-primary font-bold shadow-md hover:scale-105 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
