import MESSAGES from './constants/message.js';

export const inputValidation = (content) => {
  const IS_EMPTY = content.length === 0;

  if (IS_EMPTY) throw new Error(MESSAGES.EMPTY_STRING);
};
