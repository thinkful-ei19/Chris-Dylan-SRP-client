import { API_BASE_URL } from '../config';
import { fetchCurrentQuestionSuccess } from './questions';

export const MAKE_GUESS_REQUEST = 'MAKE_GUESS_REQUEST';
export const makeGuessRequest = () => ({
  type: MAKE_GUESS_REQUEST
});

export const MAKE_GUESS_SUCCESS = 'MAKE_GUESS_SUCCESS';
export const makeGuessSuccess = (currentGuess) => ({
  type: MAKE_GUESS_SUCCESS,
  currentGuess
});

export const MAKE_GUESS_ERROR = 'MAKE_GUESS_ERROR';
export const makeGuessError = error => ({
  type: MAKE_GUESS_ERROR,
  error
});

export const makeGuess = (authToken, currentGuess, deckId, correct) => dispatch => {
  dispatch(makeGuessRequest());
  return fetch(`${API_BASE_URL}/update-session/${deckId}`, {
    method: 'POST',
    body: JSON.stringify({ correct }),
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      dispatch(makeGuessSuccess(currentGuess));
      dispatch(fetchCurrentQuestionSuccess(res.question, res.answer));
    })
    // .then(() => dispatch(makeGuessSuccess(currentGuess)))
    .catch(err => dispatch(makeGuessError(err)));
};