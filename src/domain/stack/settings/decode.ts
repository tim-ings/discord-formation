import * as t from 'io-ts';
import { fromEnum } from '../../../util/validation';
import { NotificationSetting, VerificationLevel, ExplicitMediaContentFilter } from '../../types';

export type SettingsStack = t.TypeOf<typeof SettingsStackCodec>;

export const SettingsStackCodec = t.type({
  Name: t.string,
  Icon: t.string,
  InactiveChannel: t.string,
  InactiveTimeout: t.string,
  SystemMessages: t.type({
    Channel: t.string,
    SendRandomWelcomeMessages: t.boolean,
    SendBoostMessages: t.boolean,
  }),
  DefaultNotificationSetting: fromEnum<NotificationSetting>(NotificationSetting, `NotificationSetting`),
  VerificationLevel: fromEnum<VerificationLevel>(VerificationLevel, `VerificationLevel`),
  ExplicitMediaContentFilter: fromEnum<ExplicitMediaContentFilter>(ExplicitMediaContentFilter, `ExplicitMediaContentFilter`),
});
