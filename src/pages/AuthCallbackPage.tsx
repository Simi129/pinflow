import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token_hash = params.get('token_hash');
        const type = params.get('type');

        // Supabase может слать токен и через hash (#)
        const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');

        // Вариант 1: token_hash (новый формат Supabase — email confirmation)
        if (token_hash && type) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });

          if (verifyError) {
            setError(verifyError.message);
            setTimeout(() => navigate('/login?error=verify_failed'), 2000);
            return;
          }

          navigate('/dashboard');
          return;
        }

        // Вариант 2: access_token в hash (старый формат / Google OAuth)
        if (access_token && refresh_token) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (sessionError) {
            setError(sessionError.message);
            setTimeout(() => navigate('/login?error=session_failed'), 2000);
            return;
          }

          navigate('/dashboard');
          return;
        }

        // Вариант 3: просто проверяем текущую сессию (на случай если Supabase сам всё обработал)
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate('/dashboard');
          return;
        }

        // Ничего не нашли
        setError('Invalid confirmation link');
        setTimeout(() => navigate('/login?error=invalid_link'), 2000);

      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setTimeout(() => navigate('/login?error=callback_failed'), 2000);
      }
    };

    handleCallback();
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
            <p className="text-on-surface mb-2 font-medium">Verification failed</p>
            <p className="text-sm text-on-surface-variant">{error}</p>
            <p className="text-xs text-on-surface-variant mt-2">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 border-2 border-surface-container-high border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-on-surface font-medium">Confirming your email...</p>
            <p className="text-sm text-on-surface-variant mt-2">Please wait...</p>
          </>
        )}
      </div>
    </div>
  );
}