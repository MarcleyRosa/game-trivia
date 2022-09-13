export const LOG_IN = 'LOG_IN';
export const NEW_SCORE = 'NEW_SCORE';
export const PLAYERS_INFO = 'PLAYERS_INFO';
export const RESET_SCORE = 'RESET_SCORE';

export const loginAction = (name, email) => ({
  type: LOG_IN,
  name,
  email,
});

export const scoreAction = (state) => ({
  type: NEW_SCORE,
  state,
});

export const rankingAction = (player, picture, score) => ({
  type: PLAYERS_INFO,
  player,
  picture,
  score,
});

export const resetScoreAction = () => ({
  type: RESET_SCORE,
});
