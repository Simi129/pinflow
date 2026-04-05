import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

// Layout
import DashboardLayout from './components/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreatePinPage from './pages/CreatePinPage';
import SettingsPage from './pages/SettingsPage';
import PublicationsPage from './pages/PublicationsPage';
import AnalyticsPage from './pages/AnalyticsPage';

// Auth guard — redirects to /login if no session
function RequireAuth({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  return authed ? <>{children}</> : <Navigate to="/login" replace />;
}

// Redirect already-authed users away from /login
function GuestOnly({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setChecking(false);
    });
  }, []);

  if (checking) return null;
  return authed ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<GuestOnly><LoginPage /></GuestOnly>}
        />
        <Route
          path="/signup"
          element={<GuestOnly><LoginPage /></GuestOnly>}
        />

        {/* OAuth callback — Supabase handles it via URL hash; just redirect */}
        <Route path="/auth/callback" element={<Navigate to="/dashboard" replace />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={<RequireAuth><DashboardLayout /></RequireAuth>}
        >
          <Route index element={<DashboardPage />} />
          <Route path="create" element={<CreatePinPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="schedule" element={<PublicationsPage />} />
          <Route path="audience" element={<AnalyticsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}