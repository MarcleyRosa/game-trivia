export const LOG_IN = 'LOG_IN';
export const NEW_SCORE = 'NEW_SCORE';

export const loginAction = (name, email) => ({
  type: LOG_IN,
  name,
  email,
});

export const scoreAction = (state) => ({
  type: NEW_SCORE,
  state,
});
