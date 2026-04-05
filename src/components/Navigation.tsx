import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { LogOut, LayoutDashboard } from 'lucide-react';
import Logo from './shared/Logo';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Hide nav on dashboard pages (they have their own sidebar)
  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo onClick={() => navigate('/')} />

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-20 h-8 bg-slate-100 rounded-full animate-pulse" />
          ) : user ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white text-xs font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm text-slate-600">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1"
                  title="Sign out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm ring-1 ring-slate-900/5"
              >
                Start Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}