import { API_BASE_URL } from '../config';

export const FETCH_CURRENT_QUESTION_REQUEST = 'FETCH_CURRENT_QUESTION_REQUEST';
export const fetchCurrentQuestionRequest = () => ({
  type: FETCH_CURRENT_QUESTION_REQUEST
});

export const FETCH_CURRENT_QUESTION_SUCCESS = 'FETCH_CURRENT_QUESTION_SUCCESS';
export const fetchCurrentQuestionSuccess = (currentQuestion, currentCorrectAnswer) => ({
  type: FETCH_CURRENT_QUESTION_SUCCESS,
  currentQuestion,
  currentCorrectAnswer
});

export const FETCH_CURRENT_QUESTION_ERROR = 'FETCH_CURRENT_QUESTION_ERROR';
export const fetchCurrentQuestionError = error => ({
  type: FETCH_CURRENT_QUESTION_ERROR,
  error
});

export const fetchCurrentQuestion = (authToken, deckId) => dispatch => {
  dispatch(fetchCurrentQuestionRequest());
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
    .then(res => dispatch(fetchCurrentQuestionSuccess(res.linkedList.head.value.question, res.linkedList.head.value.answer)))
    .catch(err => dispatch(fetchCurrentQuestionError(err)));
};