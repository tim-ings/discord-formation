import { parseTimeString } from './time-string';

describe(`time string`, () => {
  test.each([
    [`5s`, 5],
    [`60s`, 60],
    [`500s`, 500],
    [`1m5s`, (1 * 60) + 5],
    [`3h1m5s`, (3 * 60 * 60) + (1 * 60) + 5],
    [`18m`, (18 * 60)],
    [`4h`, (4 * 60 * 60)],
  ])(`given %p > when parse > should return expected result`, (timeString, expectedSeconds) => {
    expect(parseTimeString(timeString)).toEqual({ seconds: expectedSeconds });
  });

  test(`given bad value > when parse > should return undefined`, () => {
    expect(parseTimeString(`foo`)).toBeUndefined();
  });
});
