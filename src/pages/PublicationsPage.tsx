import React from 'react';
import { Sidebar } from '../components/Navigation';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Calendar, 
  Trash2, 
  ArrowDown,
  Share2,
  Mail
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function PublicationsPage() {
  const pins = [
    { 
      title: 'Scandi Living Essentials', 
      date: 'Oct 24, 2024 • 10:30 AM', 
      status: 'Pending', 
      statusColor: 'text-tertiary',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80'
    },
    { 
      title: 'Sustainable Furniture Guide', 
      date: 'Oct 24, 2024 • 12:00 PM', 
      status: 'Success', 
      statusColor: 'text-green-600',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80'
    },
    { 
      title: 'Productivity Desk Setup', 
      date: 'Oct 25, 2024 • 09:00 AM', 
      status: 'Pending', 
      statusColor: 'text-tertiary',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80'
    },
    { 
      title: 'Winter Reading Nook', 
      date: 'Oct 26, 2024 • 07:45 PM', 
      status: 'Pending', 
      statusColor: 'text-tertiary',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80'
    },
    { 
      title: 'Visual Identity System', 
      date: 'Oct 27, 2024 • 11:15 AM', 
      status: 'Pending', 
      statusColor: 'text-tertiary',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen p-8">
        <header className="max-w-7xl mx-auto mb-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface mb-2">Publications</h2>
              <p className="text-on-surface-variant text-lg">Manage your curated visual storytelling across all boards.</p>
            </div>
            <button className="flex items-center gap-2 primary-gradient text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              <Plus size={20} />
              <span>Create New Pin</span>
            </button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 bg-white/80 backdrop-blur p-1 rounded-xl shadow-sm border border-outline-variant/15 flex">
              <button className="flex-1 py-2 text-sm font-bold text-primary bg-white rounded-lg shadow-sm">Scheduled</button>
              <button className="flex-1 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface">Published</button>
              <button className="flex-1 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface">Drafts</button>
            </div>
            <div className="col-span-12 md:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
              <input className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-on-surface-variant outline-none" placeholder="Search pins by title or tag..." type="text" />
            </div>
            <div className="col-span-12 md:col-span-3 relative">
              <select className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none outline-none">
                <option>All Boards</option>
                <option>Interior Design '24</option>
                <option>Minimalist Tech</option>
                <option>Brand Identity</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" size={18} />
            </div>
          </div>
        </header>
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pins.map((pin, idx) => (
              <div key={idx} className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={pin.image} alt={pin.title} referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4">
                    <span className={cn("px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm", pin.statusColor)}>
                      {pin.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2 w-full">
                      <button className="flex-1 bg-white text-on-surface text-xs font-bold py-2 rounded-lg hover:bg-surface-variant transition-colors">Edit</button>
                      <button className="p-2 bg-white text-primary rounded-lg hover:bg-primary/10 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-headline font-bold text-on-surface truncate mb-1">{pin.title}</h3>
                  <p className="text-on-surface-variant text-[11px] font-medium flex items-center gap-1">
                    <Calendar size={12} />
                    {pin.date}
                  </p>
                  <button className="mt-4 w-full border border-outline-variant/30 text-on-surface text-xs font-bold py-2 rounded-lg hover:bg-surface-container transition-colors">Post Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-20 flex flex-col items-center gap-6 pb-12">
          <div className="h-[1px] w-32 bg-outline-variant/30"></div>
          <button className="group flex items-center gap-4 text-on-surface font-headline font-black text-xl hover:text-primary transition-colors">
            Load more curated pins
            <ArrowDown className="group-hover:translate-y-1 transition-transform" size={24} />
          </button>
        </div>
        <footer className="w-full py-12 border-t border-stone-200 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-headline font-bold text-on-surface mb-4">PinFlow</h4>
              <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">The editorial curator for your social automation and visual storytelling.</p>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Support</h5>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">API Docs</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-4 mt-8 pt-8 border-t border-stone-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-on-surface-variant">© 2024 PinFlow Automation. All rights reserved.</p>
              <div className="flex gap-6">
                <Share2 className="text-stone-400 hover:text-primary cursor-pointer transition-colors" size={20} />
                <Mail className="text-stone-400 hover:text-primary cursor-pointer transition-colors" size={20} />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
