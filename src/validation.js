import MESSAGES from './constants/message.js';

export const inputValidation = (content, separators) => {
  const isEmpty = content.length === 0;
  const isNotIncludeNumber = content.split('').every((char) => isNaN(char));
  const inValidCharsRegex = new RegExp(`[^0-9${separators.join('')}]`);
  const hasInvalidChars = inValidCharsRegex.test(content);

  if (isEmpty) throw new Error(MESSAGES.EMPTY_STRING);
  if (isNotIncludeNumber) throw new Error(MESSAGES.NOT_NUMBER);
  if (hasInvalidChars) throw new Error(MESSAGES.INVALID_INPUT_FORMAT);
};
