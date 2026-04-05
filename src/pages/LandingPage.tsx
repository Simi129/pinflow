import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Navigation';
import { Play, Calendar, BarChart3, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '../lib/utils';

export default function LandingPage() {
  const stats = [
    { label: 'Pins Automated Monthly', value: '50,000+' },
    { label: 'Monthly Impressions', value: '12.4M' },
    { label: 'Active Curators', value: '15k+' },
    { label: 'User Satisfaction', value: '4.9/5' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-10"
            >
              <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-widest">
                Growth Engine
              </span>
              <h1 className="text-6xl md:text-7xl font-extrabold text-on-surface leading-[1.1] mb-8 tracking-tight">
                Automate your <span className="text-primary">Pinterest</span> Growth
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-lg">
                Turn your visual content into a high-converting traffic source. Schedule, analyze, and scale your presence with the curator's choice for automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="primary-gradient text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:translate-y-[-4px] transition-all shadow-xl active:scale-95 text-center">
                  Start Free Trial
                </Link>
                <button className="bg-surface-container-lowest text-on-surface px-8 py-4 rounded-xl font-bold text-lg border border-outline-variant/15 hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Play size={20} fill="currentColor" /> Watch Demo
                </button>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 pt-12">
                  <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500">
                    <img className="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" alt="Fashion" referrerPolicy="no-referrer" />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500">
                    <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" alt="Watch" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500">
                    <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" alt="Sneaker" referrerPolicy="no-referrer" />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500 relative">
                    <img className="w-full h-72 object-cover" src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" alt="Concert" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
                      <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full border border-white/20">
                        <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-white" 
                          />
                        </div>
                        <p className="text-[10px] text-white mt-1 font-bold uppercase tracking-widest">Growth Trend +84%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center md:justify-between items-center gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-4xl font-black text-on-surface tracking-tighter">{stat.value}</p>
                <p className="text-on-surface-variant font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-5xl font-bold text-on-surface mb-6">Built for Visual Success</h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Skip the manual grind. Our tools are designed to think like a curator while executing like a machine.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 group bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 overflow-hidden relative min-h-[320px]">
                <div className="flex flex-col h-full justify-between z-10 relative">
                  <div>
                    <Calendar className="text-primary mb-4" size={40} />
                    <h3 className="text-3xl font-bold text-on-surface mb-4">Visual Scheduler</h3>
                    <p className="text-on-surface-variant text-lg max-w-md">Drag, drop, and design your perfect content flow. Our intuitive board view lets you see your aesthetic before it goes live.</p>
                  </div>
                </div>
                <div className="absolute right-[-5%] bottom-[-10%] w-1/2 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                  <img 
                    className="rounded-xl shadow-2xl rotate-[-5deg]" 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                    alt="Dashboard" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 group">
                <BarChart3 className="text-tertiary mb-4" size={40} />
                <h3 className="text-2xl font-bold text-on-surface mb-4">Smart Analytics</h3>
                <p className="text-on-surface-variant">Real-time data that matters. Track repins, outbound clicks, and audience sentiment in a clean editorial dashboard.</p>
                <div className="mt-8 pt-8 border-t border-outline-variant/10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Peak Engagement</div>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 60, 90, 70, 50].map((h, i) => (
                      <div 
                        key={i}
                        className={cn(
                          "w-full rounded-t-sm transition-all duration-700",
                          i === 2 ? "bg-primary" : "bg-surface-container-high"
                        )}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-4">Auto-Resharing</h3>
                <p className="text-on-surface-variant">Maximize every pin's lifespan. Our algorithm automatically resharing your top-performing content at optimal times.</p>
              </div>

              <div className="md:col-span-2 bg-gradient-to-r from-stone-900 to-stone-800 p-12 rounded-xl flex items-center justify-between overflow-hidden relative">
                <div className="z-10 max-w-md">
                  <h3 className="text-3xl font-bold text-white mb-4">Ready to Pin Better?</h3>
                  <p className="text-white/70 mb-8">Join the elite curators who have scaled their visual brand with PinFlow's intelligent automation.</p>
                  <Link to="/pricing" className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95 inline-block">
                    Upgrade to Pro
                  </Link>
                </div>
                <div className="hidden lg:block absolute right-0 top-0 h-full w-1/2 opacity-20">
                  <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" alt="Nature" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-surface">
          <div className="max-w-5xl mx-auto px-8 text-center bg-surface-container-lowest rounded-[3rem] p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
            <h2 className="text-5xl font-black text-on-surface mb-8 tracking-tight">Your Visual Legacy Starts Here.</h2>
            <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop manually pinning and start strategically growing. Join 50,000+ creators who trust PinFlow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/signup" className="primary-gradient text-on-primary px-10 py-5 rounded-xl font-bold text-xl hover:translate-y-[-4px] transition-all shadow-xl active:scale-95 text-center">
                Get Started for Free
              </Link>
              <button className="bg-white text-on-surface px-10 py-5 rounded-xl font-bold text-xl border border-outline-variant/15 hover:bg-surface-container-low transition-all active:scale-95">
                Contact Sales
              </button>
            </div>
            <p className="mt-8 text-sm text-on-surface-variant font-medium">No credit card required. 14-day free trial.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}