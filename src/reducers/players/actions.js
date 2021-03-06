import * as types from './actionTypes';

import { startLoading, doneLoading, sendErrorNotification } from '../app/actions';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

/*
* Load all players
* @params
* queryParams: <object> {key: value, ...}
*/
export function loadPlayers(queryParams) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    dispatch(playersLoading());

    let queryString = "";
    if (queryParams && queryParams.position) {
      queryString = "?position=" + queryParams.position;
    }

    console.log(API_ENDPOINT)
    fetch(`${API_ENDPOINT}/players${queryString}` , {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      return response.json();
    }).then(players => {
      if (players.error) throw Error(players.error);
      dispatch(dispatchLoadPlayers(players));
      dispatch(doneLoading());
    }).catch(error => {
        console.log(error);
        const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
        'Please try again!' : error.message;
        dispatch(doneLoading());
        dispatch(sendErrorNotification(errMsg));
    });
  }
}

/*
* Load all players
* @params
* queryParams: <object> {key: value, ...}
*/
export function loadFreeAgents(queryParams) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    dispatch(playersLoading());

    let queryString = "";
    if (queryParams && queryParams.position) {
      queryString = "?position=" + queryParams.position;
    }

    fetch(`${API_ENDPOINT}/players/free-agents${queryString}` , {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      return response.json();
    }).then(players => {
      if (players.error) throw Error(players.error);
      dispatch(dispatchLoadPlayers(players));
      dispatch(doneLoading());
    }).catch(error => {
        console.log(error);
        const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
        'Please try again!' : error.message;
        dispatch(doneLoading());
        dispatch(sendErrorNotification(errMsg));
    });
  }
}

function dispatchLoadPlayers(players) {
  return {
    type: types.LOAD_PLAYERS,
    payload: players
  }
}

function playersLoading() {
  return {
    type: types.PLAYERS_LOADING
  }
}
