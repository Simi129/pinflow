export type ViewType = 'landing' | 'auth' | 'dashboard';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  full_name?: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  source: string;
  created_at?: string;
}

export interface MetricData {
  data_status: string;
  date: string;
  metrics: {
    IMPRESSION?: number;
    OUTBOUND_CLICK?: number;
    PIN_CLICK?: number;
    SAVE?: number;
  };
}

export interface AnalyticsData {
  all: MetricData[];
  daily_metrics?: MetricData[];
}

export interface AccountAnalytics {
  success: boolean;
  analytics: AnalyticsData;
  period: { start_date: string; end_date: string; days: number };
}

export interface PinAnalytics {
  success: boolean;
  analytics: AnalyticsData;
  pin_id: string;
}

export interface BoardAnalytics {
  success: boolean;
  analytics: AnalyticsData;
  board_id: string;
}

export interface DashboardStats {
  totalViews: number;
  totalEngagements: number;
  totalSaves: number;
  totalClicks: number;
  viewsChange: string;
  engagementsChange: string;
}

export interface PinterestBoard {
  id: string;
  name: string;
  description?: string;
  privacy: 'PUBLIC' | 'SECRET';
  pin_count?: number;
  follower_count?: number;
}