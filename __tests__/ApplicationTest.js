import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test.each([
    ['//;\n;', '[ERROR]'],
    ['aaa', '[ERROR]'],
    ['1a2,c', '[ERROR]'],
  ])('입력: %s에 대한 예외테스트', async (input, expected) => {
    mockQuestions([input]);

    const app = new App();
    await expect(app.run()).rejects.toThrow(expected);
  });

  test.each([
    ['1,2,3', 6],
    ['1:2:3', 6],
    ['1,2:3', 6],
    ['5', 5],
    ['//;\\n4;2,3', 9],
    ['//ab\\n1ab2,3', 6],
  ])('입력 "%s"에 대한 정상테스트', async (input, expected) => {
    const inputs = [input];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(`결과 : ${expected}`);
  });
});
