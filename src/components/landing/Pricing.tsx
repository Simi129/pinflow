import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-200/50 text-rose-600 text-sm font-medium mb-6">
          <Sparkles size={16} className="animate-pulse" />
          Limited Time Offer
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Launch Special</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Be among the first to experience the future of Pinterest automation
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-white/80 backdrop-blur-xl rounded-3xl"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-400/20 via-orange-400/20 to-rose-400/20 blur-xl"></div>

        <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl shadow-rose-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-orange-500/5 animate-pulse"></div>

          <div className="relative p-12 md:p-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Sparkles size={36} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              100% Free Until February 1st, 2026
            </h3>
            <p className="text-center text-slate-600 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Join our exclusive beta program and enjoy unlimited access to all premium features at absolutely no cost.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {['Unlimited pin scheduling', 'Advanced AI analytics', 'Priority customer support', 'All premium features included', 'No credit card required', 'Cancel anytime after launch'].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 hover:border-rose-200 transition-all group">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mb-8 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100">
              <Calendar size={20} className="text-rose-600" />
              <span className="text-slate-700 font-medium">
                Free access ends in <span className="text-rose-600 font-bold">25 days</span>
              </span>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white font-semibold text-lg hover:scale-105 transition-all shadow-2xl shadow-slate-900/30 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose-600 via-orange-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center gap-3">
                  Start for Free Today
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </span>
              </button>
              <p className="text-sm text-slate-500 mt-6">No payment required • Full access • No obligations</p>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200/50">
              <div className="flex items-center justify-center gap-8 text-center">
                {[{ val: '500+', label: 'Early Users' }, { val: '50K+', label: 'Pins Scheduled' }, { val: '4.9★', label: 'Beta Rating' }].map((stat, i, arr) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    <div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">{stat.val}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</div>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-12 bg-slate-200"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-4 -left-4 w-24 h-24 bg-rose-300/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-slate-400 mb-4">Trusted by creators from</p>
        <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
          {['Pinterest', 'Etsy', 'Shopify', 'Instagram'].map(b => <div key={b} className="text-slate-400 font-semibold">{b}</div>)}
        </div>
      </div>
    </section>
  );
}