import { API_BASE_URL } from '../config';
import { fetchCurrentQuestionSuccess } from './questions';

export const INCREMENT_TOTAL_CORRECT = 'INCREMENT_TOTAL_CORRECT';
export const incrementTotalCorrect = totalCorrect => ({
  type: INCREMENT_TOTAL_CORRECT,
  totalCorrect
});

export const getCount = (authToken, userId) => dispatch => {
  return fetch(`${API_BASE_URL}/get-count/${userId}`, {
    method: 'GET'
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    dispatch(incrementTotalCorrect(res.totalCorrect))    
  })
  .catch(err => console.error(err))
}

export const postCount = (authToken, userId) => dispatch => {
  return fetch(`${API_BASE_URL}/increment-count/${userId}`, {
    method: 'PUT'
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    dispatch(incrementTotalCorrect(res.totalCorrect + 1))    
  })
  .catch(err => console.error(err))
}

export const MAKE_GUESS_REQUEST = 'MAKE_GUESS_REQUEST';
export const makeGuessRequest = () => ({
  type: MAKE_GUESS_REQUEST
});

export const MAKE_GUESS_SUCCESS = 'MAKE_GUESS_SUCCESS';
export const makeGuessSuccess = (currentGuess, isCorrect, previousCorrectAnswer) => ({
  type: MAKE_GUESS_SUCCESS,
  currentGuess,
  isCorrect,
  previousCorrectAnswer
});

export const MAKE_GUESS_ERROR = 'MAKE_GUESS_ERROR';
export const makeGuessError = error => ({
  type: MAKE_GUESS_ERROR,
  error
});

export const makeGuess = (authToken, currentGuess, deckId, correct, correctAnswer) => dispatch => {
  dispatch(makeGuessRequest());
  return fetch(`${API_BASE_URL}/update-session/${deckId}`, {
    method: 'POST',
    body: JSON.stringify({ correct }),
    headers: { Authorization: `Bearer ${authToken}`, 'content-type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(makeGuessSuccess(currentGuess, correct, correctAnswer));
      dispatch(fetchCurrentQuestionSuccess(res.question, res.answer, res._id));
    })
    .catch(err => dispatch(makeGuessError(err)));
};

export const RESET_FEEDBACK = 'RESET_FEEDBACK';
export const resetFeedback = () => ({
  type: RESET_FEEDBACK
});