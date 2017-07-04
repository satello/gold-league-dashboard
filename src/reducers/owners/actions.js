import * as types from './actionTypes';

import { startLoading, doneLoading, sendErrorNotification } from '../app/actions';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

/*
* Load all owners
* @params
* queryParams: <object> {key: value, ...}
*/
export function loadOwners() {
  return (dispatch, getState) => {
    dispatch(startLoading());
    dispatch(ownersLoading());

    fetch(`${API_ENDPOINT}/teams` , {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      return response.json();
    }).then(owners => {
      if (owners.error) throw Error(owners.error);
      dispatch(dispatchLoadData(owners));
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

export function loadOwnerDetails(name) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    dispatch(ownersLoading());

    Promise.all([
      fetch(`${API_ENDPOINT}/teams/${name}` , {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      })
      .then(response => {
        return response.json();
      }),
      fetch(`${API_ENDPOINT}/teams/${name}/players` , {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      })
      .then(response => {
        return response.json();
      })
    ]).then(ownerDetailsArray => {
      let flattenedDetails = {};
      for (var i=0; i < ownerDetailsArray.length; i++) {
        if (ownerDetailsArray[i].error) {
          throw Error(ownerDetailsArray[i].error);
        }
        Object.assign(flattenedDetails, ownerDetailsArray[i]);
      }
      dispatch(dispatchLoadData(flattenedDetails));
      dispatch(doneLoading());
    }).catch(error => {
        console.log(error);
        const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
        'Please try again!' : error.message;
        dispatch(doneLoading());
        dispatch(sendErrorNotification(errMsg));
    })
  }
}

function dispatchLoadData(data) {
  return {
    type: types.LOAD_DATA,
    payload: data
  }
}

function ownersLoading() {
  return {
    type: types.OWNERS_LOADING
  }
}
