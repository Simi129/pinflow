import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Navigation';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MousePointer2, 
  Calendar, 
  Bell, 
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Search,
  History
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import PinterestConnect from '../components/dashboard/PinterestConnect';
import PinAnalyticsModal from '../components/dashboard/PinAnalyticsModal';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedPin, setSelectedPin] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const metrics = [
    { label: 'Total Impressions', value: '1.2M', trend: '+12%', icon: Eye, color: 'primary' },
    { label: 'Engagements', value: '84.2K', trend: '+8%', icon: Heart, color: 'primary' },
    { label: 'Click-throughs', value: '12.5%', trend: 'Stable', icon: MousePointer2, color: 'tertiary' },
  ];

  const topPins = [
    { id: 'pin_1', title: 'Modern Architecture Minimalist Trends 2024', views: '42.8K', saves: '1.2K', growth: '+18%', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80' },
    { id: 'pin_2', title: 'The Art of Morning Rituals & Wellness', views: '31.2K', saves: '840', growth: '+12%', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80' },
    { id: 'pin_3', title: 'Sustainable Fashion Essentials Guide', views: '28.5K', saves: '520', growth: '+5%', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=200&q=80' },
  ];

  const automations = [
    { name: 'Auto-Pin Batch #42', status: 'Successful', statusColor: 'text-green-600', icon: Sparkles, iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { name: 'Content Sync', status: 'Active', statusColor: 'text-on-surface-variant', icon: RefreshCw, iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary' },
    { name: 'Niche Discovery', status: 'In Progress', statusColor: 'text-orange-600', icon: Search, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { name: 'Daily Cleanup', status: 'Idle', statusColor: 'text-on-surface-variant', icon: History, iconBg: 'bg-stone-100', iconColor: 'text-stone-500' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar user={user} />
      
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-8 py-6 flex justify-between items-center border-b border-stone-100">
          <div>
            <h1 className="text-2xl font-black text-on-surface tracking-tight">Performance Hub</h1>
            <p className="text-on-surface-variant text-sm font-medium">
              Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'} 👋
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-on-surface-variant cursor-pointer hover:bg-surface-container-high transition-all">
              <Calendar size={14} />
              Last 30 Days
              <ChevronDown size={14} />
            </div>
            <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-8 py-8 pb-12">

          {/* Pinterest Connection */}
          <div className="mb-8">
            <PinterestConnect />
          </div>

          {/* Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metrics.map((m) => (
              <div key={m.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <m.icon size={48} />
                </div>
                <p className="text-on-surface-variant text-sm font-semibold mb-1">{m.label}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-black text-on-surface">{m.value}</h3>
                  <span className={cn("font-bold text-sm mb-1 flex items-center", m.color === 'primary' ? "text-primary" : "text-secondary")}>
                    <ArrowUpRight size={12} />
                    {m.trend}
                  </span>
                </div>
                <div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    className={cn("h-full", m.color === 'primary' ? "bg-primary" : "bg-tertiary")}
                  />
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-on-surface">Performance over time</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs font-medium text-on-surface-variant">Impressions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                    <span className="text-xs font-medium text-on-surface-variant">Saves</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[300px] w-full flex items-end">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                  <path d="M0,250 C100,220 200,280 300,180 C400,80 500,150 600,100 C700,50 800,120 900,80 L1000,100" fill="none" stroke="#b7001a" strokeWidth="4" strokeLinecap="round" />
                  <path d="M0,280 C150,260 250,220 350,240 C450,260 550,180 650,200 C750,220 850,160 1000,140" fill="none" opacity="0.6" stroke="#005f90" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="absolute left-[60%] top-[80px] bg-on-surface text-white text-[10px] py-1 px-2 rounded-lg transform -translate-x-1/2">602.4K Views</div>
                <div className="absolute left-[60%] top-[100px] w-px h-[180px] bg-on-surface opacity-10"></div>
              </div>
              <div className="flex justify-between mt-6 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
              </div>
            </div>

            {/* Top Pins */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-on-surface">Top Performing Pins</h2>
                <button className="text-primary text-xs font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-6">
                {topPins.map((pin) => (
                  <div
                    key={pin.id}
                    className="flex items-center gap-4 group cursor-pointer hover:bg-surface-container-low rounded-xl p-2 -mx-2 transition-colors"
                    onClick={() => setSelectedPin({ id: pin.id, title: pin.title })}
                    title="Click to view analytics"
                  >
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={pin.image} alt={pin.title} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-on-surface line-clamp-1 mb-1">{pin.title}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] text-on-surface-variant"><Eye size={12} /> {pin.views}</div>
                        <div className="flex items-center gap-1 text-[10px] text-on-surface-variant"><Heart size={12} /> {pin.saves}</div>
                      </div>
                      <p className="text-[10px] text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click for analytics →</p>
                    </div>
                    <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-full">{pin.growth}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-surface-container rounded-xl text-center">
                <p className="text-xs font-bold text-on-surface mb-2">Want better results?</p>
                <p className="text-[11px] text-on-surface-variant mb-4">Our AI suggests posting between 7PM and 9PM for your niche.</p>
                <button className="text-xs font-black text-on-surface flex items-center justify-center gap-2 w-full hover:translate-x-1 transition-transform">
                  Schedule Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Automations */}
          <section className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Recent Automations</h2>
              <span className="text-xs text-on-surface-variant font-medium">3 running now</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {automations.map((a) => (
                <div key={a.name} className="p-4 bg-white rounded-xl border border-stone-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", a.iconBg, a.iconColor)}>
                    <a.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">{a.name}</p>
                    <p className={cn("text-[10px] font-bold", a.statusColor)}>{a.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Pin Analytics Modal */}
      {selectedPin && user && (
        <PinAnalyticsModal
          pinId={selectedPin.id}
          userId={user.id}
          pinTitle={selectedPin.title}
          onClose={() => setSelectedPin(null)}
        />
      )}
    </div>
  );
}