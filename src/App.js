import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './message.js';

class App {
  #separators;

  async run() {
    const INPUT_STRING = await this.userInput(MESSAGES.USER_INPUT);
  }

  async userInput(content) {
    return await Console.readLineAsync(content);
  }

  setSeparator(inputString) {
    this.#separators = [',', ':'];
  }
}

export default App;
