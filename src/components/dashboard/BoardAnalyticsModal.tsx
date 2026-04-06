import { useState, useEffect } from 'react';
import { getBoardAnalytics } from '../../lib/api';
import { BoardAnalytics } from '../../lib/types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Eye, Heart, MousePointerClick, TrendingUp, X, Loader2, LayoutGrid } from 'lucide-react';

interface BoardAnalyticsModalProps {
  boardId: string;
  userId: string;
  boardName: string;
  onClose: () => void;
}

export default function BoardAnalyticsModal({ boardId, userId, boardName, onClose }: BoardAnalyticsModalProps) {
  const [analytics, setAnalytics] = useState<BoardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    loadBoardAnalytics();
  }, [period]);

  const loadBoardAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getBoardAnalytics(boardId, userId, period);
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading board analytics:', error);
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

  const radarData = [
    { metric: 'Impressions', value: totals.impressions > 0 ? Math.min((totals.impressions / 10000) * 100, 100) : 0 },
    { metric: 'Saves', value: totals.saves > 0 ? Math.min((totals.saves / 1000) * 100, 100) : 0 },
    { metric: 'Clicks', value: totals.clicks > 0 ? Math.min((totals.clicks / 1000) * 100, 100) : 0 },
    { metric: 'Outbound', value: totals.outboundClicks > 0 ? Math.min((totals.outboundClicks / 500) * 100, 100) : 0 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-slate-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2 text-xs">
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
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Board Analytics</h2>
              <p className="text-sm text-slate-500 mt-0.5">{boardName}</p>
            </div>
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
                  { icon: <Eye className="w-5 h-5" />, label: 'Total Impressions', value: formatNumber(totals.impressions), gradient: 'from-rose-500 to-pink-500' },
                  { icon: <Heart className="w-5 h-5" />, label: 'Total Saves', value: formatNumber(totals.saves), gradient: 'from-orange-500 to-rose-500' },
                  { icon: <MousePointerClick className="w-5 h-5" />, label: 'Pin Clicks', value: formatNumber(totals.clicks), gradient: 'from-amber-500 to-orange-500' },
                  { icon: <TrendingUp className="w-5 h-5" />, label: 'Outbound Clicks', value: formatNumber(totals.outboundClicks), gradient: 'from-lime-500 to-emerald-500' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 text-white shadow-lg`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Performance Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                      <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="impressions" stroke="#e11d48" fill="#e11d48" fillOpacity={0.2} strokeWidth={2} name="Impressions" />
                      <Area type="monotone" dataKey="saves" stroke="#f97316" fill="#f97316" fillOpacity={0.2} strokeWidth={2} name="Saves" />
                      <Area type="monotone" dataKey="clicks" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} name="Clicks" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Performance Radar</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Radar name="Performance" dataKey="value" stroke="#e11d48" fill="#e11d48" fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Engagement Rates</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Save Rate', value: totals.impressions > 0 ? `${((totals.saves / totals.impressions) * 100).toFixed(2)}%` : '0%', color: 'text-orange-600' },
                      { label: 'Click Rate', value: totals.impressions > 0 ? `${((totals.clicks / totals.impressions) * 100).toFixed(2)}%` : '0%', color: 'text-amber-600' },
                      { label: 'CTR', value: totals.impressions > 0 ? `${((totals.outboundClicks / totals.impressions) * 100).toFixed(2)}%` : '0%', color: 'text-lime-600' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                        <span className="text-sm text-slate-600">{item.label}</span>
                        <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Daily Averages</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Avg. Impressions', value: analytics ? formatNumber(Math.round(totals.impressions / (analytics.analytics.all.length || 1))) : '0' },
                      { label: 'Avg. Saves', value: analytics ? formatNumber(Math.round(totals.saves / (analytics.analytics.all.length || 1))) : '0' },
                      { label: 'Avg. Clicks', value: analytics ? formatNumber(Math.round(totals.clicks / (analytics.analytics.all.length || 1))) : '0' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                        <span className="text-sm text-slate-600">{item.label}</span>
                        <span className="text-lg font-bold text-blue-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Insights</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Best Day', value: analytics && chartData.length > 0 ? chartData.reduce((best, curr) => curr.impressions > best.impressions ? curr : best).date : 'N/A' },
                      { label: 'Total Engagement', value: formatNumber(totals.saves + totals.clicks + totals.outboundClicks) },
                      { label: 'Period', value: `${period} days` },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                        <span className="text-sm text-slate-600">{item.label}</span>
                        <span className="text-sm font-bold text-purple-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Score */}
              <div className="mt-6 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Board Performance Score</h3>
                    <p className="text-rose-100 text-sm">Based on impressions, engagement, and growth trends</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold mb-1">
                      {Math.round(Math.min(
                        ((totals.impressions / 10000) * 30 + (totals.saves / 1000) * 25 + (totals.clicks / 1000) * 25 + (totals.outboundClicks / 500) * 20),
                        100
                      ))}
                    </div>
                    <div className="text-rose-100 text-sm">out of 100</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}