import { LOG_IN, NEW_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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
  default: return state;
  }
};

export default playerReducer;
