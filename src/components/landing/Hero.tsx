import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import LeadForm from './LeadForm';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="max-w-5xl mx-auto px-6 text-center py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium mb-8">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        New: AI Caption Generator
      </div>

      <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 tracking-tight mb-6 leading-[1.1]">
        Automate your inspiration.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
          Scale your revenue.
        </span>
      </h1>

      <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        The all-in-one platform to schedule pins, analyze trends, and grow your audience on Pinterest without the manual grind.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={() => navigate('/login')} className="h-12 px-8 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20">
          Get Started
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>
        <button className="h-12 px-8 rounded-full bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all flex items-center gap-2">
          <PlayCircle size={18} strokeWidth={1.5} />
          Watch Demo
        </button>
      </div>

      <LeadForm />
    </section>
  );
}