import MESSAGES from './constants/message.js';

export const inputValidation = (content) => {
  const IS_EMPTY = content.length === 0;
  const IS_NOT_INCLUDE_NUMBER = content.split('').every((char) => isNaN(char));

  if (IS_EMPTY) throw new Error(MESSAGES.EMPTY_STRING);
  if (IS_NOT_INCLUDE_NUMBER) throw new Error(MESSAGES.NOT_NUMBER);
};
