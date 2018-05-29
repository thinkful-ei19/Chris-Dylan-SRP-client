import { API_BASE_URL } from '../config';

export const FETCH_CURRENT_QUESTION_REQUEST = 'FETCH_CURRENT_QUESTION_REQUEST';
export const fetchCurrentQuestionRequest = () => ({
  type: FETCH_CURRENT_QUESTION_REQUEST
});

export const FETCH_CURRENT_QUESTION_SUCCESS = 'FETCH_CURRENT_QUESTION_SUCCESS';
export const fetchCurrentQuestionSuccess = (currentQuestion, currentCorrectAnswer, questionId) => ({
  type: FETCH_CURRENT_QUESTION_SUCCESS,
  currentQuestion,
  currentCorrectAnswer,
  questionId
});

export const FETCH_CURRENT_QUESTION_ERROR = 'FETCH_CURRENT_QUESTION_ERROR';
export const fetchCurrentQuestionError = error => ({
  type: FETCH_CURRENT_QUESTION_ERROR,
  error
});

export const addItem = (authToken, request) => {
  return fetch(`${API_BASE_URL}/add-item`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken}`,
    'content-type': 'application/json'},
    body: JSON.stringify(request)
  })
  .then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(res => console.log(res))
  .catch((err) => console.error(err))
}

export const deleteItem = (authToken, request) => dispatch => {
  const deckId = request.deckId;
  return fetch(`${API_BASE_URL}/delete-item`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken}`,
    'content-type': 'application/json'},
    body: JSON.stringify(request)
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json()
  })
  .then((res) => {
    dispatch(fetchCurrentQuestion(authToken, deckId));
  })
  .catch(err => console.error(err))
}

export const editItem = (authToken, request) => dispatch => {
  const deckId = request.deckId;
  return fetch(`${API_BASE_URL}/edit-item`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${authToken}`,
    'content-type': 'application/json'},
    body: JSON.stringify(request)
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);      
    }
    return res.json()
  })
  .then((res) => {
    console.log(res)
    dispatch(fetchCurrentQuestion(authToken, deckId));
  })
  .catch(err => console.error(err))
}


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
    .then(res => {
      if (res.linkedList.head !== null) {
        if (res.linkedList.head.value.__id) {
          dispatch(fetchCurrentQuestionSuccess(res.linkedList.head.value.question, res.linkedList.head.value.answer, res.linkedList.head.value.__id))
        } else {
          dispatch(fetchCurrentQuestionSuccess(res.linkedList.head.value.question, res.linkedList.head.value.answer, res.linkedList.head.value._id))
        }
      } else {
        console.log('no data')
      }
    })
    .catch(err => dispatch(fetchCurrentQuestionError(err)));
};