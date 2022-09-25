export type SeasonsData = {
  data: Seasons;
};

export type Seasons = {
  name: string;
  is_current_season: boolean;
  id: number;
  current_round_id: number;
  league_id: number;
};

export type RoundsBySeason = {
  results: {
    data: NextRound[];
  };
};

export type NextRound = {
  start: string;
  end: string;
  league_id: number;
};
