import * as types from './actionTypes';
import _ from 'lodash';
import {assignWeights} from '../players/reducer.js';

const initialState = {
  owners: [],
  hasLoaded: false
};

export default function players(state = initialState, action = {}) {
  switch (action.type) {

    case types.LOAD_DATA:
      if (action.payload.players) {
        action.payload.players = _.map(action.payload.players, assignWeights);
      }
      return Object.assign(state, {hasLoaded: true, data: action.payload});

    case types.OWNERS_LOADING:
      return Object.assign(state, {hasLoaded: false});

    default:
      return state;
  }
}
