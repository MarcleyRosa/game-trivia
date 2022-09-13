import { LOG_IN, NEW_SCORE, PLAYERS_INFO, RESET_SCORE, NEW_ASSERTIONS } from '../actions';

export const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  ranking: [],
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOG_IN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case NEW_SCORE:
    return {
      ...state,
      score: state.score + action.state,
    };
  case PLAYERS_INFO:
    return {
      ...state,
      ranking: [...state.ranking, {
        name: action.player,
        picture: action.picture,
        score: Number(action.score),
      }].sort((a, b) => b.score - a.score),
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
    };
  case NEW_ASSERTIONS:
    return {
      ...state,
      assertions: action.state,
    };
  default: return state;
  }
};

export default playerReducer;
