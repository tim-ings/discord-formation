import { isLeft, isRight } from 'fp-ts/lib/Either';
import { PathReporter } from '../../util/validation';
import { EmojisStackCodec } from './decode';
import { EmojisStack } from './types';

describe(`decode`, () => {
  test(`given valid emojis stack > when decode > should return right with no errors`, () => {
    const validStack: EmojisStack = [
      { Name: `mildpanic`, Image: `https://images.local/mildpanic.png` },
      { Name: `feelsGoodMan`, Image: `https://images.local/frog.png` },
    ];

    const decodedStack = EmojisStackCodec.decode(validStack);
    expect(PathReporter.report(decodedStack)).toEqual([]);
    expect(isRight(decodedStack)).toBe(true);
  });

  test(`given invalid emojis stack > when decode > should return left with errors`, () => {
    const invalidStack = [
      { Name: [], Image: false, foo: 123 },
      { Name: { bar: 123 }, Image: null },
    ];

    const decodedStack = EmojisStackCodec.decode(invalidStack);
    expect(PathReporter.report(decodedStack)).toEqual([
      `Invalid value [] for [0].Name expected type string`,
      `Invalid value false for [0].Image expected type string`,
      `Invalid value {"bar":123} for [1].Name expected type string`,
      `Invalid value null for [1].Image expected type string`,
    ]);
    expect(isLeft(decodedStack)).toBe(true);
  });
});
