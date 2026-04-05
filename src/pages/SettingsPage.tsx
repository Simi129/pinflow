import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, Bell, Lock, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import PinterestConnect from '../components/dashboard/PinterestConnect';

export default function SettingsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  useEffect(() => {
    const pinterestConnected = searchParams.get('pinterest_connected');
    const pinterestError = searchParams.get('pinterest_error');

    if (pinterestConnected === 'true') {
      setNotification({ show: true, type: 'success', message: 'Pinterest connected successfully! 🎉' });
      setTimeout(() => navigate('/dashboard/settings', { replace: true }), 1000);
      setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
    }

    if (pinterestError) {
      setNotification({ show: true, type: 'error', message: `Failed to connect Pinterest: ${pinterestError}` });
      setTimeout(() => navigate('/dashboard/settings', { replace: true }), 1000);
      setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
    }
  }, [searchParams, navigate]);

  return (
    <>
      {/* Toast notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`rounded-lg shadow-lg p-4 min-w-[320px] max-w-md ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start gap-3">
              {notification.type === 'success'
                ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
              <p className={`font-medium text-sm ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {notification.message}
              </p>
              <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="flex-shrink-0 text-slate-400 hover:text-slate-600 ml-auto">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
      </header>

      <div className="p-8 max-w-4xl space-y-6">
        {/* Pinterest Connection */}
        <PinterestConnect />

        {/* Other settings */}
        {[
          { icon: <User size={20} />, title: 'Profile', description: 'Manage your profile information' },
          { icon: <Bell size={20} />, title: 'Notifications', description: 'Configure notification preferences' },
          { icon: <Lock size={20} />, title: 'Privacy & Security', description: 'Control your privacy settings' },
          { icon: <CreditCard size={20} />, title: 'Billing', description: 'Manage your subscription and billing' },
        ].map((item, idx) => (
          <button
            key={idx}
            className="w-full bg-white rounded-xl border border-slate-200 p-6 hover:border-rose-200 hover:shadow-sm transition-all text-left flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}