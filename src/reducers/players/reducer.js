import * as types from './actionTypes';

const initialState = {
  players: [],
  playersLoaded: false
};

export default function players(state = initialState, action = {}) {
  switch (action.type) {

    case types.LOAD_PLAYERS:
      return Object.assign(state, {playersLoaded: true, data: action.payload});

    default:
      return state;
  }
}
