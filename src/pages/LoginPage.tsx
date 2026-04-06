import React, { useState, useEffect } from 'react';
import { Mail, Lock, LayoutGrid } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === '/signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard');
    });
  }, [navigate]);

  // Sync mode with route
  useEffect(() => {
    setIsSignUp(location.pathname === '/signup');
    setError(null);
    setSuccessMsg(null);
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isSignUp) {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (err) throw err;
        if (data.session) {
          navigate('/dashboard');
        } else {
          setSuccessMsg('Check your email for the confirmation link!');
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const toggleMode = () => {
    const next = isSignUp ? '/login' : '/signup';
    navigate(next);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 bg-surface">
      <div className="absolute inset-0 z-0 bg-surface-container-low opacity-50"></div>
      
      <main className="relative z-10 w-full max-w-[480px]">
        <div className="mb-12 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="text-primary-container" size={36} fill="currentColor" />
            <h1 className="font-headline font-black text-3xl tracking-tighter text-primary-container">PinFlow</h1>
          </div>
          <p className="text-on-surface-variant font-medium">Curate your workflow, automate your growth.</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-8 sm:p-12 shadow-2xl ring-1 ring-outline-variant/15">
          <div className="mb-8">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-on-secondary-container text-sm">
              {isSignUp ? 'Start automating your Pinterest today.' : 'Please enter your details to sign in.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
              {successMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Full Name</label>
                <input
                  className="w-full pl-4 pr-4 py-4 bg-surface-container rounded-xl border-none ring-1 ring-transparent focus:ring-2 focus:ring-primary-container transition-all outline-none"
                  placeholder="Your name"
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface-container rounded-xl border-none ring-1 ring-transparent focus:ring-2 focus:ring-primary-container transition-all outline-none"
                  placeholder="alex@example.com"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Password</label>
                {!isSignUp && (
                  <Link to="#" className="text-xs font-semibold text-primary hover:text-primary-container transition-colors">Forgot Password?</Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface-container rounded-xl border-none ring-1 ring-transparent focus:ring-2 focus:ring-primary-container transition-all outline-none"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full primary-gradient text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
              <span className="bg-surface-container-lowest px-4 text-on-surface-variant">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-container-lowest ring-1 ring-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-semibold text-on-secondary-container">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-container-lowest ring-1 ring-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
              <span className="text-sm font-semibold text-on-secondary-container">Facebook</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-on-secondary-container text-sm">
            {isSignUp ? 'Already have an account?' : 'New to PinFlow?'}{' '}
            <button
              onClick={toggleMode}
              className="font-bold text-primary ml-1 hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </div>
      </main>

      <footer className="absolute bottom-8 left-0 right-0 text-center px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.2em]">© 2024 PinFlow Automation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors">Terms</Link>
            <Link to="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}