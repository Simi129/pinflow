import { Zap, TrendingUp, Clock } from 'lucide-react';

const features = [
  { icon: <Zap className="w-6 h-6" />, title: 'AI-Powered Automation', description: 'Schedule pins automatically with smart timing based on when your audience is most active.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Advanced Analytics', description: 'Track performance metrics, identify trending content, and optimize your strategy in real-time.' },
  { icon: <Clock className="w-6 h-6" />, title: 'Bulk Scheduling', description: 'Upload and schedule hundreds of pins at once. Set it and forget it while we handle the rest.' },
];

export function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-slate-900 mb-4">Everything you need to grow</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Powerful tools designed to save you time and maximize your Pinterest performance.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-rose-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-400 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  { q: 'How does the free beta period work?', a: "Until February 1st, 2026, you get complete access to all Autopin features at no cost. No credit card required, no hidden fees, no obligations. After the beta period ends, you can choose a plan that fits your needs or cancel anytime." },
  { q: 'What happens after February 1st, 2026?', a: "We'll notify you well in advance before the beta period ends. You'll have the option to choose from our paid plans starting from $19/month, or you can export your data and cancel. There will be no surprise charges." },
  { q: 'Do you support multiple Pinterest accounts?', a: 'Absolutely! During the beta period, you can connect unlimited Pinterest accounts, making it easy to manage brands, clients, or personal projects all in one place.' },
  { q: 'Is my data secure?', a: "Yes. We use bank-level encryption and never store your Pinterest passwords. We only request the minimum permissions needed to schedule pins. Your data is yours, and you can export or delete it anytime." },
  { q: 'Can I invite my team during the beta?', a: 'Yes! Team collaboration features are fully available during the beta period. Invite as many team members as you need to work together on your Pinterest strategy.' },
];

export function FAQ() {
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-slate-500">Everything you need to know about Autopin.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-rose-200 transition-colors">
            <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between text-slate-900 font-medium hover:bg-slate-50 transition-colors">
              {faq.q}
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-4 text-slate-600 leading-relaxed">{faq.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

const footerLinks = {
  product: [{ name: 'Features', href: '#features' }, { name: 'Pricing', href: '#pricing' }, { name: 'FAQ', href: '#faq' }],
  company: [{ name: 'About', href: '#' }, { name: 'Blog', href: '#' }, { name: 'Contact', href: 'mailto:support@arjumedia.com' }],
  legal: [{ name: 'Privacy', href: '/privacy' }, { name: 'Terms', href: '/terms' }, { name: 'Security', href: '#' }],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-lg"></div>
              <span className="text-white font-semibold">AUTOPIN</span>
            </div>
            <p className="text-sm leading-relaxed">Automate your Pinterest marketing and grow your business effortlessly.</p>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold mb-4 text-sm capitalize">{section}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link, i) => (
                  <li key={i}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 Autopin. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-slate-700">•</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function DashboardPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="relative rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden p-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-blue-500/5"></div>
        <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
          <div className="h-8 bg-white border-b border-slate-100 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-orange-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90 select-none pointer-events-none">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm col-span-2">
              <div className="h-4 w-1/3 bg-slate-100 rounded mb-4"></div>
              <div className="flex items-end gap-2 h-32">
                {[40, 70, 55, 80, 45].map((h, i) => (
                  <div key={i} className="w-full rounded-t" style={{ height: `${h}%`, backgroundColor: i === 3 ? '#f43f5e' : i === 1 ? '#fb923c' : '#ffe4e6' }}></div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-100"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}