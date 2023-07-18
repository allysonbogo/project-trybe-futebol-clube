const match = {
  id: 1,
  home_team_id: 24,
  home_team_goals: 1,
  away_team_id: 1,
  away_team_goals: 0,
  in_progress: false,
};

const matches = [match];

const updateMatchBody = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
}

const createMatchBody = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export {
  match,
  matches,
  updateMatchBody,
  createMatchBody,
};