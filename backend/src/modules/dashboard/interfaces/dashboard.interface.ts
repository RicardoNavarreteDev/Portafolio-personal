export interface DashboardStats {
  posts: number;
  projects: number;
  messages: {
    total: number;
    responded: number;
    pending: number;
  };
}

export interface DashboardResponse {
  message: string;
  user: {
    sub: number;
    email: string;
    role: string;
  };
  stats: DashboardStats;
}