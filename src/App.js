import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/message.js';
import { DEFAULT_SEPARATORS, CUSTOM_SEPARATOR_PATTERN } from './constants/separator.js';

class App {
  #separators;

  async run() {
    const INPUT_STRING = await this.userInput(MESSAGES.USER_INPUT);
    this.setSeparator(INPUT_STRING);
    this.printResult(this.#separators);
  }

  async userInput(content) {
    return await Console.readLineAsync(content);
  }

  async printResult(result) {
    return await Console.print(MESSAGES.PRINT_RESULT + result);
  }

  extractNumbers(inputString) {}

  setSeparator(inputString) {
    this.#separators = DEFAULT_SEPARATORS;
    const customSeparator = inputString.match(CUSTOM_SEPARATOR_PATTERN)?.[1];
    if (customSeparator) {
      this.#separators.push(customSeparator);
    }
  }
}

export default App;
