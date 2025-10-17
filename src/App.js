import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/message.js';
import { DEFAULT_SEPARATORS, CUSTOM_SEPARATOR_PATTERN } from './constants/separator.js';
import { inputValidation } from './validation.js';

class App {
  #separators;

  async run() {
    const INPUT_STRING = await this.userInput(MESSAGES.USER_INPUT);
    inputValidation(INPUT_STRING);
    this.setSeparator(INPUT_STRING);
    const numbers = this.extractNumbers(INPUT_STRING);
    const result = this.sumNumbers(numbers);
    this.printResult(result);
  }

  async userInput(content) {
    return await Console.readLineAsync(content);
  }

  printResult(result) {
    return Console.print(MESSAGES.PRINT_RESULT + result);
  }

  setSeparator(inputString) {
    this.#separators = [...DEFAULT_SEPARATORS];
    const customSeparator = inputString.match(CUSTOM_SEPARATOR_PATTERN)?.[1];
    if (customSeparator) {
      this.#separators.push(customSeparator);
    }
  }

  extractNumbers(inputString) {
    const separatorsRegex = new RegExp(`[${this.#separators.join('')}]`);

    const hasCustomSeparator = this.#separators.some(
      (separator) => !DEFAULT_SEPARATORS.includes(separator),
    );

    const startIndex = hasCustomSeparator ? inputString.indexOf('\\n') + 2 : 0;
    const parseInput = inputString.slice(startIndex);
    const splitBySeparators = parseInput.split(separatorsRegex).map((num) => Number(num));
    return splitBySeparators;
  }

  sumNumbers(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  }
}

export default App;
