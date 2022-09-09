export const LOG_IN = 'LOG_IN';

export const loginAction = (name, email) => ({
  type: LOG_IN,
  name,
  email,
});
