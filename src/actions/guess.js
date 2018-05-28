export const MAKE_GUESS_REQUEST = 'MAKE_GUESS_REQUEST';
export const makeGuessRequest = () => ({
  type: MAKE_GUESS_REQUEST
});

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = currentGuess => ({
  type: MAKE_GUESS,
  currentGuess
});

// export const MAKE_GUESS_ERROR = 'MAKE_GUESS_ERROR';