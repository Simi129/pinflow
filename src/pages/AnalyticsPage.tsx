import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Analytics</h1>
      </header>
      <div className="p-8 flex items-center justify-center h-96">
        <div className="text-center text-slate-400">
          <BarChart3 size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Analytics coming soon</p>
          <p className="text-sm mt-1">Connect Pinterest and start publishing to see data here.</p>
        </div>
      </div>
    </>
  );
}