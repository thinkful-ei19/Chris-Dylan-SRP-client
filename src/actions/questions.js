import { API_BASE_URL } from '../config';

export const FETCH_CURRENT_QUESTION_REQUEST = 'FETCH_CURRENT_QUESTION_REQUEST';
export const fecthCurrentQuestionRequest = () => ({
  type: FETCH_CURRENT_QUESTION_REQUEST
});

export const FETCH_CURRENT_QUESTION_SUCCESS = 'FETCH_CURRENT_QUESTION_SUCCESS';
export const fecthCurrentQuestionSuccess = currentQuestion => ({
  type: FETCH_CURRENT_QUESTION_REQUEST,
  currentQuestion
});

export const FETCH_CURRENT_QUESTION_ERROR = 'FETCH_CURRENT_QUESTION_ERROR';
export const fecthCurrentQuestionError = error => ({
  type: FETCH_CURRENT_QUESTION_ERROR,
  error
});

export const fetchCurrentQuestion = authToken => dispatch => {
  dispatch(fecthCurrentQuestionRequest());
  return fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(question => dispatch(fecthCurrentQuestionSuccess(question)))
    .catch(err => dispatch(fecthCurrentQuestionError(err)));
};