import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function PinterestCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handle = async () => {
      const params = new URLSearchParams(window.location.search);
      const connected = params.get('pinterest_connected');
      const pinterestError = params.get('pinterest_error');

      if (pinterestError) {
        setError(decodeURIComponent(pinterestError));
        setTimeout(() => navigate('/dashboard/settings?pinterest_error=true'), 2000);
        return;
      }

      if (connected === 'true') {
        // Проверяем что сессия Supabase жива
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          navigate('/settings?pinterest_connected=true');
        } else {
          // Сессия протухла — отправляем логиниться заново
          navigate('/login?redirect=/dashboard/settings');
        }
        return;
      }

      // Неизвестный сценарий
      navigate('/dashboard/settings');
    };

    handle();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        {error ? (
          <>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-on-surface font-medium mb-2">Pinterest connection failed</p>
            <p className="text-sm text-on-surface-variant">{error}</p>
            <p className="text-xs text-on-surface-variant mt-2">Redirecting...</p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 border-2 border-surface-container-high border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-on-surface font-medium">Connecting Pinterest...</p>
            <p className="text-sm text-on-surface-variant mt-2">Please wait...</p>
          </>
        )}
      </div>
    </div>
  );
}