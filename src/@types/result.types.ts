export type Result = {
  data: [];
  meta: IMeta;
};

export type IMeta = {
  plans: IPlans[];
  sports: ISports[];
  pagination: IPagination;
};

export type IPlans = {
  name: string;
  features: string;
  request_limit: string;
  sport: string;
};

export type ISports = {
  id: number;
  name: string;
  current: string;
};

export type IPagination = {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: {
    next: string;
  };
};
