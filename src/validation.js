import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/message.js';

export const inputValidation = (userString, separators) => {
  const isEmpty = userString.length === 0;
  const isNotIncludeNumber = userString.split('').every((char) => isNaN(char));

  const inValidCharsRegex = new RegExp(`[^0-9${separators.join('')}]`);
  const hasInvalidChars = inValidCharsRegex.test(userString);

  if (isEmpty) throw new Error(MESSAGES.EMPTY_STRING);
  if (isNotIncludeNumber) throw new Error(MESSAGES.NOT_NUMBER);
  if (hasInvalidChars) throw new Error(MESSAGES.INVALID_INPUT_FORMAT);
};
