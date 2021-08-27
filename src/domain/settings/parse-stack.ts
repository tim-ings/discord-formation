import { ValidationError } from '../../util/error';
import { parseTimeString } from '../../util/time-string';
import { objectValidator, validBoolean, validEnum, validString, validTimeString } from '../../util/validation';
import { ExplicitMediaContentFilter, NotificationSetting, SettingsState, VerificationLevel } from './types';

export type ServerSettingsStackResource = {
  Name: string
  Icon: string
  InactiveChannel: string
  InactiveTimeout: string
  SystemMessages: {
    Channel: string
    SendRandomWelcomeMessages: boolean
    SendBoostMessages: boolean
  }
  DefaultNotificationSetting: NotificationSetting
  VerificationLevel: VerificationLevel
  ExplicitMediaContentFilter: ExplicitMediaContentFilter
}

export interface SettingsStackParser {
  (stack: Record<string, unknown>): Promise<SettingsState>
}

export const settingsStackParser = (): SettingsStackParser => {

  function validateSettingsStack(stack: unknown): asserts stack is ServerSettingsStackResource {
    const isValid = objectValidator<ServerSettingsStackResource>(`Stack Validation: Server.Settings`, {
      Name: validString,
      Icon: validString,
      InactiveChannel: validString,
      InactiveTimeout: validTimeString,
      SystemMessages: objectValidator<ServerSettingsStackResource[`SystemMessages`]>(`.SystemMessages`, {
        Channel: validString,
        SendRandomWelcomeMessages: validBoolean,
        SendBoostMessages: validBoolean,
      }),
      DefaultNotificationSetting: validEnum(NotificationSetting),
      VerificationLevel: validEnum(VerificationLevel),
      ExplicitMediaContentFilter: validEnum(ExplicitMediaContentFilter),
    });

    const result = isValid(stack);
    console.log(`Validation result:`, { result });
    if (!result.valid) throw new ValidationError(result.errors);
  }

  return async stack => {
    const settingsStack = stack?.Settings;
    validateSettingsStack(settingsStack);

    return {
      name: settingsStack.Name,
      icon: settingsStack.Icon,
      inactiveChannelId: settingsStack.InactiveChannel,
      inactiveTimeout: parseTimeString(settingsStack.InactiveTimeout)?.seconds,
      systemMessages: {
        channelId: settingsStack.SystemMessages.Channel,
        sendBoostMessages: settingsStack.SystemMessages.SendBoostMessages,
        sendRandomWelcomeMessages: settingsStack.SystemMessages.SendRandomWelcomeMessages,
      },
      defaultNotificationSetting: settingsStack.DefaultNotificationSetting,
      verificationLevel: settingsStack.VerificationLevel,
      explicitMediaContentFilter: settingsStack.ExplicitMediaContentFilter,
    };
  };
};
