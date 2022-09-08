const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAYER_INFOS':
    return {
      ...state,
    };
  default: return state;
  }
};

export default playerReducer;
