import { useState } from 'react';
import { Plus, Search, Calendar, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockPins = [
  { title: 'Spring Garden Ideas', date: 'Apr 24, 2026 • 10:30 AM', status: 'Scheduled', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80' },
  { title: 'Sustainable Furniture Guide', date: 'Apr 24, 2026 • 12:00 PM', status: 'Published', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80' },
  { title: 'Productivity Desk Setup', date: 'Apr 25, 2026 • 09:00 AM', status: 'Scheduled', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80' },
  { title: 'Winter Reading Nook', date: 'Apr 26, 2026 • 07:45 PM', status: 'Draft', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80' },
];

const statusColor: Record<string, string> = {
  Scheduled: 'text-rose-600',
  Published: 'text-emerald-600',
  Draft: 'text-slate-500',
};

export default function PublicationsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'Scheduled' | 'Published' | 'Draft'>('Scheduled');
  const [search, setSearch] = useState('');

  const filtered = mockPins.filter(p =>
    (tab === 'Scheduled' ? p.status === 'Scheduled' : tab === 'Published' ? p.status === 'Published' : p.status === 'Draft') &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Publications</h1>
        <button
          onClick={() => navigate('/dashboard/create')}
          className="h-9 px-4 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Create New Pin
        </button>
      </header>

      <div className="p-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 gap-1">
            {(['Scheduled', 'Published', 'Draft'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === t ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search pins..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg font-medium mb-2">No pins found</p>
            <p className="text-sm">Try a different filter or create a new pin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pin, idx) => (
              <div key={idx} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={pin.image}
                    alt={pin.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 bg-white/90 backdrop-blur text-xs font-semibold rounded-full shadow-sm ${statusColor[pin.status]}`}>
                      {pin.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2 w-full">
                      <button className="flex-1 bg-white text-slate-900 text-xs font-medium py-2 rounded-lg hover:bg-slate-50 transition-colors">Edit</button>
                      <button className="p-2 bg-white text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 truncate mb-1">{pin.title}</h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <Calendar size={12} />
                    {pin.date}
                  </p>
                  <button className="mt-3 w-full border border-slate-200 rounded-lg text-xs font-medium py-2 text-slate-600 hover:bg-slate-50 transition-colors">
                    Post Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}