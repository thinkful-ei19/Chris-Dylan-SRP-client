import { API_BASE_URL } from '../config';

export const FETCH_CURRENT_QUESTION_REQUEST = 'FETCH_CURRENT_QUESTION_REQUEST';
export const fetchCurrentQuestionRequest = () => ({
  type: FETCH_CURRENT_QUESTION_REQUEST
});

export const FETCH_CURRENT_QUESTION_SUCCESS = 'FETCH_CURRENT_QUESTION_SUCCESS';
export const fetchCurrentQuestionSuccess = currentQuestion => ({
  type: FETCH_CURRENT_QUESTION_SUCCESS,
  currentQuestion
});

export const FETCH_CURRENT_QUESTION_ERROR = 'FETCH_CURRENT_QUESTION_ERROR';
export const fetchCurrentQuestionError = error => ({
  type: FETCH_CURRENT_QUESTION_ERROR,
  error
});

export const fetchCurrentQuestion = authToken => dispatch => {
  dispatch(fetchCurrentQuestionRequest());
  return fetch(`${API_BASE_URL}/decks`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => dispatch(fetchCurrentQuestionSuccess(res[1].linkedList.head.value.question)))
    .catch(err => dispatch(fetchCurrentQuestionError(err)));
};