import { SettingsStack, SettingsStackCodec } from './decode';
import { isLeft, isRight } from 'fp-ts/lib/Either';
import { ExplicitMediaContentFilter, NotificationSetting, VerificationLevel } from '../../types';
import { PathReporter } from '../../../util/validation';

describe(`decode`, () => {
  test(`given valid settings stack > when decode > should return right with no errors`, () => {
    const validStack: SettingsStack = {
      Name: `Discord as Code`,
      Icon: `https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png`,
      InactiveChannel: `inactive`,
      InactiveTimeout: `5m`,
      SystemMessages: {
        Channel: `general`,
        SendRandomWelcomeMessages: true,
        SendBoostMessages: true,
      },
      DefaultNotificationSetting: NotificationSetting.AllMessages,
      VerificationLevel: VerificationLevel.None,
      ExplicitMediaContentFilter: ExplicitMediaContentFilter.DontScanAny,
    };

    const decodedStack = SettingsStackCodec.decode(validStack);
    expect(PathReporter.report(decodedStack)).toEqual([]);
    expect(isRight(decodedStack)).toBe(true);
  });

  test(`given invalid settings stack > when decode > should return left with errors`, () => {
    const invalidStack = {
      Name: 123,
      Icon: false,
      InactiveChannel: { foo: `bar` },
      InactiveTimeout: null,
      SystemMessages: {
        Channel: [1, 2, 3],
        SendRandomWelcomeMessages: `foo`,
        SendBoostMessages: 123,
      },
      DefaultNotificationSetting: `bar`,
      VerificationLevel: `baz`,
      ExplicitMediaContentFilter: false,
    };

    const decodedStack = SettingsStackCodec.decode(invalidStack);
    expect(PathReporter.report(decodedStack)).toEqual([
      `Invalid value 123 for Name expected type string`,
      `Invalid value false for Icon expected type string`,
      `Invalid value {"foo":"bar"} for InactiveChannel expected type string`,
      `Invalid value null for InactiveTimeout expected type string`,
      `Invalid value [1,2,3] for SystemMessages.Channel expected type string`,
      `Invalid value "foo" for SystemMessages.SendRandomWelcomeMessages expected type boolean`,
      `Invalid value 123 for SystemMessages.SendBoostMessages expected type boolean`,
      `Invalid value "bar" for DefaultNotificationSetting expected type NotificationSetting`,
      `Invalid value "baz" for VerificationLevel expected type VerificationLevel`,
      `Invalid value false for ExplicitMediaContentFilter expected type ExplicitMediaContentFilter`,
    ]);
    expect(isLeft(decodedStack)).toBe(true);
  });
});
