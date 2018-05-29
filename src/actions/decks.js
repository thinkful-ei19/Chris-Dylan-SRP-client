import { API_BASE_URL } from '../config';

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
    .then(deck => dispatch(fetchCurrentDeckSuccess(deck)))
    .catch(err => dispatch(fetchCurrentDeckError(err)));
};