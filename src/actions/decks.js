import { API_BASE_URL } from '../config';
import {fetchCurrentQuestion} from './questions';


export const FETCH_CURRENT_DECK_REQUEST = 'FETCH_CURRENT_DECK_REQUEST';
export const fetchCurrentDeckRequest = () => ({
  type: FETCH_CURRENT_DECK_REQUEST
});

export const FETCH_CURRENT_DECK_SUCCESS = 'FETCH_CURRENT_DECK_SUCCCESS';
export const fetchCurrentDeckSuccess = currentDeck => ({
  type: FETCH_CURRENT_DECK_SUCCESS,
  currentDeck
});

export const FETCH_CURRENT_DECK_ERROR = 'FETCH_CURRENT_DECK_ERROR';
export const fetchCurrentDeckError = error => ({
  type: FETCH_CURRENT_DECK_ERROR,
  error
});

export const CHANGE_DECK = 'CHANGE_DECK';
export const changeDeck = (deck) => ({
  type: CHANGE_DECK,
  deck
})

export const fetchCurrentDeck = (authToken, deckId) => dispatch => {
  dispatch(fetchCurrentDeckRequest());
  return fetch(`${API_BASE_URL}/decks/${deckId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(deck => {
      dispatch(fetchCurrentQuestion(authToken, deckId))
      if (!deck) {return;}
      dispatch(fetchCurrentDeckSuccess(deck))
    })
    .catch(err => dispatch(fetchCurrentDeckError(err)));
};

export const FETCH_DECK_NAMES = 'FETCH_DECK_NAMES';
export const fetchDeckNames = (decks) => ({
  type: FETCH_DECK_NAMES,
  decks: decks.decks
})
export const getDeckNames = (authToken, userId) => dispatch => {
  
  return fetch(`${API_BASE_URL}/deck-list/${userId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(decks => {
    dispatch(fetchDeckNames(decks))
  })
  .catch(err => console.error(err))
}

export const addDeck = (authToken, userId, name) => dispatch => {

  return fetch(`${API_BASE_URL}/add-deck`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({ userId, name })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then((res) => {
    dispatch(getDeckNames(authToken, userId))
  })
  .catch(err => console.error(err)) 
}

export const deleteDeck = (authToken, userId, deckId) => dispatch => {
  return fetch(`${API_BASE_URL}/decks/${deckId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({ userId })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res;
  })
  .then((res) => {
    dispatch(getDeckNames(authToken, userId))
  })
  .catch(err => console.error(err)) 
}

export const makePublicDeck = (authToken, request, deckId, userId) => dispatch => {
  return fetch(`${API_BASE_URL}/publish-deck/${deckId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${authToken}`, 'content-type': 'application/json' },
    body: JSON.stringify( request )
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then((res) => {
    dispatch(getDeckNames(authToken, userId))
  })
  .catch(err => console.error(err))
}

export const copyDeck = (authToken, deckId, userId) => dispatch => {
  return fetch(`${API_BASE_URL}/copy-deck/${deckId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken}`, 'content-type': 'application/json' },
    body: JSON.stringify( {userId} )
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then((res) => {
    dispatch(getDeckNames(authToken, userId))
  })
}