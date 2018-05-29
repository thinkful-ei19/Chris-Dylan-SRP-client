import { API_BASE_URL } from '../config';
import { fetchCurrentQuestionSuccess } from './questions';

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
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(makeGuessSuccess(currentGuess, correct, correctAnswer));
      dispatch(fetchCurrentQuestionSuccess(res.question, res.answer, res.question));
    })
    .catch(err => dispatch(makeGuessError(err)));
};

export const RESET_FEEDBACK = 'RESET_FEEDBACK';
export const resetFeedback = () => ({
  type: RESET_FEEDBACK
});