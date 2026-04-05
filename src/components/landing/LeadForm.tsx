import { useState } from 'react';
import { supabase } from '../../lib/supabase';

declare global { interface Window { dataLayer: any[]; } }

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');
    try {
      const { error } = await (supabase.from('leads') as any).insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        source: 'landing_hero',
        created_at: new Date().toISOString(),
      });
      if (error) throw error;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'lead_form_submit', lead_name: name.trim(), lead_email: email.trim().toLowerCase(), lead_source: 'landing_hero' });

      setState('success');
      setName(''); setEmail(''); setPhone('');
    } catch (err) {
      console.error('Lead form error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="mt-10 max-w-md mx-auto">
        <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl bg-rose-50 border border-rose-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
            <svg className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-slate-800 font-medium text-sm">You're on the list!</p>
          <p className="text-slate-500 text-xs text-center">We'll be in touch soon. Check your inbox for a confirmation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-md mx-auto">
      <p className="text-xs text-slate-400 mb-4 tracking-wide uppercase font-medium">Get early access — no credit card required</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-300 transition-all" />
        <input type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-300 transition-all" />
        <input type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-300 transition-all" />
        {state === 'error' && <p className="text-xs text-red-500 text-center">{errorMsg}</p>}
        <button type="submit" disabled={state === 'loading'} className="h-11 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-medium hover:from-rose-600 hover:to-orange-600 transition-all shadow-md shadow-rose-500/20 disabled:opacity-60 flex items-center justify-center gap-2">
          {state === 'loading' ? (<><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Sending...</>) : 'Request Early Access'}
        </button>
        <p className="text-xs text-slate-400 text-center">By submitting, you agree to our <a href="/privacy" className="underline underline-offset-2 hover:text-slate-600 transition-colors">Privacy Policy</a>.</p>
      </form>
    </div>
  );
}