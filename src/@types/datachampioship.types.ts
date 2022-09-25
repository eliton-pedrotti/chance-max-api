export type DataChampionshipType = {
  localteam_id: number;
  visitorteam_id: number;
  time: Time;
  stats: Stats;
  scores: Scores;
  league_id: number;
  season_id: number;
  round_id: number;
  round: Round;
  stage: Stage;
  id: number;
};

type Scores = {
  localteam_score: number;
  visitorteam_score: number;
};

type Time = {
  starting_at: {
    date_time: string;
  };
};

type Stats = {
  data: any;
};

type Round = {
  data: any;
};

type Stage = {
  data: any;
};