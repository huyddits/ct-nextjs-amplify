import { ApiResponse } from '@/utils/types';

export interface DashboardAlert {
  name: string;
  task: string;
  dueDate: string;
}

export interface DashboardAlerts {
  pastDue: DashboardAlert[];
  submitted: DashboardAlert[];
  recentMeasurements: DashboardAlert[];
  dueCheckoff: {
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
    weekly: number;
    total: number;
  };
  alerts: DashboardAlerts;
};

export type DashboardResponse = ApiResponse<DashboardApiResponse>;
