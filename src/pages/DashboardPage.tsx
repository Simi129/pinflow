import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User } from '../lib/types';
import { TrendingUp, Users, Eye, Heart, Bell, Search, Plus } from 'lucide-react';
import PinterestConnect from '../components/dashboard/PinterestConnect';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({ id: user.id, email: user.email!, full_name: user.user_metadata?.full_name });
      }
    };
    getUser();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search pins, boards, analytics..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
          <button
            onClick={() => navigate('/dashboard/create')}
            className="h-9 px-4 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Create Pin
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Welcome back, {user?.full_name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-slate-500">Here's what's happening with your Pinterest account today.</p>
        </div>

        {/* Pinterest Connection */}
        <div className="mb-8">
          <PinterestConnect />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Eye className="w-5 h-5" />, label: 'Total Views', value: '12.5K', change: '+12.3%', up: true },
            { icon: <Heart className="w-5 h-5" />, label: 'Engagements', value: '3.2K', change: '+8.1%', up: true },
            { icon: <Users className="w-5 h-5" />, label: 'Followers', value: '1.8K', change: '+5.2%', up: true },
            { icon: <TrendingUp className="w-5 h-5" />, label: 'Pins Created', value: '145', change: '+23%', up: true },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className={`text-xs font-semibold ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts and Upcoming */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Performance Overview</h3>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-rose-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="p-6">
              <div className="flex items-end gap-2 h-64">
                {[40, 70, 55, 80, 45, 65, 90].map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end">
                    <div
                      className="bg-gradient-to-t from-rose-500 to-orange-400 rounded-t transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-slate-500">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Upcoming Posts</h3>
              <button className="text-xs text-rose-600 font-medium hover:text-rose-700">View All</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { title: 'Spring Garden Ideas', time: 'Today, 3:00 PM', status: 'scheduled' },
                { title: 'Top 10 DIY Hacks', time: 'Tomorrow, 9:00 AM', status: 'scheduled' },
                { title: 'Healthy Meal Prep', time: 'Wed, 12:30 PM', status: 'draft' },
              ].map((post, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gradient-to-br from-rose-200 to-orange-200"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{post.title}</p>
                    <p className="text-xs text-slate-500">{post.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${post.status === 'scheduled' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={() => navigate('/dashboard/schedule')}
                className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}