import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  players: [],
  playersLoaded: false,
};

export default function players(state = initialState, action = {}) {
  switch (action.type) {

    case types.LOAD_PLAYERS:
      let players = action.payload;
      // assign weights
      players = _.map(players, assignWeights);
      // sort by value

      return Object.assign(state, {playersLoaded: true, data: players});

    case types.PLAYERS_LOADING:
      return Object.assign(state, {playersLoaded: false});

    default:
      return state;
  }
}


export function assignWeights(player) {
  const WEIGHTS = JSON.parse(localStorage.getItem("weights"));
  let adjusted_values = [player.value, player.redraft_value];

  // adjust for position
  adjusted_values = _.map(adjusted_values, (val) => Math.round(val * WEIGHTS.positions[player.position]))

  // adjust for player
  if (WEIGHTS.players[player.name]) {
    adjusted_values = _.map(adjusted_values, (val) => Math.round(val * WEIGHTS.players[player.name]))
  }

  // something feels a bit off here....
  player.dynasty_value = adjusted_values[0];
  player.redraft_value = adjusted_values[1];

  // redraft bias weighing
  if (WEIGHTS.redraft > 0) {
    player.value = Math.round((WEIGHTS.redraft * player.redraft_value) + ((1-WEIGHTS.redraft) * player.dynasty_value));
  }

  return player;
}
