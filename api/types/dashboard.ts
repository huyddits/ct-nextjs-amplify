import { ApiResponse } from '@/utils/types';

export interface DashboardAlert {
  name: string;
  task: string;
  dueDate: string;
  id?: string; // Optional ID for React key usage
}

export interface DashboardAlerts {
  pastDue: DashboardAlert[];
  submitted: DashboardAlert[];
  recentMeasurements: DashboardAlert[];
  dueCheckoffs: {
    '1DayLeft': DashboardAlert[];
    '3DaysLeft': DashboardAlert[];
    '5DaysLeft': DashboardAlert[];
  };
}

export type DashboardApiResponse = {
  team_check_off: {
    weekly: number;
    monthly: number;
  };
  team_training_average: {
    cardio: number;
    strength: number;
    minutesPerWeek: number;
  };
  hit_miss: {
    total_hit_percentage: number;
    weekly_hit_percentage: number;
  };
};

export type DashboardResponse = ApiResponse<DashboardApiResponse>;

export type DashboardAlertsResponse = ApiResponse<{
  alerts: DashboardAlerts;
}>;
