import { useState, useEffect } from 'react';
import { getPinAnalytics } from '../../lib/api';
import { PinAnalytics } from '../../lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Eye, Heart, MousePointerClick, TrendingUp, X, Loader2 } from 'lucide-react';

interface PinAnalyticsModalProps {
  pinId: string;
  userId: string;
  pinTitle: string;
  onClose: () => void;
}

export default function PinAnalyticsModal({ pinId, userId, pinTitle, onClose }: PinAnalyticsModalProps) {
  const [analytics, setAnalytics] = useState<PinAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    loadPinAnalytics();
  }, [period]);

  const loadPinAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getPinAnalytics(pinId, userId, period);
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading pin analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const chartData = analytics?.analytics.all.map(metric => ({
    date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    impressions: metric.metrics.IMPRESSION || 0,
    saves: metric.metrics.SAVE || 0,
    clicks: metric.metrics.PIN_CLICK || 0,
    outboundClicks: metric.metrics.OUTBOUND_CLICK || 0,
  })) || [];

  const totals = analytics?.analytics.all.reduce((acc, metric) => ({
    impressions: acc.impressions + (metric.metrics.IMPRESSION || 0),
    saves: acc.saves + (metric.metrics.SAVE || 0),
    clicks: acc.clicks + (metric.metrics.PIN_CLICK || 0),
    outboundClicks: acc.outboundClicks + (metric.metrics.OUTBOUND_CLICK || 0),
  }), { impressions: 0, saves: 0, clicks: 0, outboundClicks: 0 }) || { impressions: 0, saves: 0, clicks: 0, outboundClicks: 0 };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-slate-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-600">{entry.name}:</span>
              <span className="font-semibold text-slate-900">{formatNumber(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pin Analytics</h2>
            <p className="text-sm text-slate-500 mt-1">{pinTitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={60}>60 Days</option>
              <option value={90}>90 Days</option>
            </select>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: <Eye className="w-5 h-5" />, label: 'Impressions', value: formatNumber(totals.impressions), color: 'rose' },
                  { icon: <Heart className="w-5 h-5" />, label: 'Saves', value: formatNumber(totals.saves), color: 'orange' },
                  { icon: <MousePointerClick className="w-5 h-5" />, label: 'Clicks', value: formatNumber(totals.clicks), color: 'amber' },
                  { icon: <TrendingUp className="w-5 h-5" />, label: 'Outbound', value: formatNumber(totals.outboundClicks), color: 'lime' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-3`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Line Chart */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Performance Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} stroke="#cbd5e1" />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke="#cbd5e1" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="impressions" stroke="#e11d48" strokeWidth={2} dot={{ fill: '#e11d48', r: 3 }} name="Impressions" />
                    <Line type="monotone" dataKey="saves" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 3 }} name="Saves" />
                    <Line type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} name="Clicks" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Engagement Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} stroke="#cbd5e1" />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke="#cbd5e1" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="saves" fill="#f97316" name="Saves" />
                    <Bar dataKey="clicks" fill="#f59e0b" name="Clicks" />
                    <Bar dataKey="outboundClicks" fill="#84cc16" name="Outbound" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Engagement Rate */}
              <div className="mt-6 bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-6 border border-rose-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Engagement Rate</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Save Rate', value: totals.impressions > 0 ? `${((totals.saves / totals.impressions) * 100).toFixed(2)}%` : '0%' },
                    { label: 'Click Rate', value: totals.impressions > 0 ? `${((totals.clicks / totals.impressions) * 100).toFixed(2)}%` : '0%' },
                    { label: 'Overall Rate', value: totals.impressions > 0 ? `${(((totals.saves + totals.clicks) / totals.impressions) * 100).toFixed(2)}%` : '0%' },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-2xl font-bold text-rose-600 mb-1">{item.value}</p>
                      <p className="text-sm text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}