import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/message.js';
import { DEFAULT_SEPARATORS, CUSTOM_SEPARATOR_PATTERN } from './constants/separator.js';
import { inputValidation } from './validation.js';

class App {
  #separators;

  async run() {
    const INPUT_STRING = await this.userInput(MESSAGES.USER_INPUT);

    this.setSeparator(INPUT_STRING);

    const parseInput = this.parseInput(INPUT_STRING);

    const numbers = this.extractNumbers(parseInput);

    inputValidation(parseInput, this.#separators);

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

  extractNumbers(parseInput) {
    const separatorsRegex = new RegExp(`[${this.#separators.join('')}]`);

    const splitBySeparators = parseInput.split(separatorsRegex).map((num) => Number(num));
    return splitBySeparators;
  }

  parseInput(inputString) {
    const hasCustomSeparator = this.#separators.some(
      (separator) => !DEFAULT_SEPARATORS.includes(separator),
    );

    const startIndex = hasCustomSeparator ? inputString.indexOf('\\n') + 2 : 0;
    return inputString.slice(startIndex);
  }

  sumNumbers(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  }
}

export default App;
