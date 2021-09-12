import { Client } from 'discord.js';
import { ExplicitMediaContentFilter, NotificationSetting, VerificationLevel } from './types';
import { SettingsState } from './types';

export interface SettingsStateQueryHandler {
  (guildId: string): Promise<SettingsState>
}

export const settingsStateQueryHandler = (
  client: Client
): SettingsStateQueryHandler =>
  async guildId => {
    const guild = await client.guilds.fetch(guildId);

    const queryDefaultNotificationSetting = (): NotificationSetting => {
      switch (guild.defaultMessageNotifications) {
        case `ALL`: return NotificationSetting.AllMessages;
        case `MENTIONS`: return NotificationSetting.OnlyMentions;
        default: throw Error(`Encountered unknown default notification setting: ${guild.defaultMessageNotifications}`);
      }
    };

    const queryVerificationLevel = (): VerificationLevel => {
      switch (guild.verificationLevel) {
        case `NONE`: return VerificationLevel.None;
        case `LOW`: return VerificationLevel.Low;
        case `MEDIUM`: return VerificationLevel.Medium;
        case `HIGH`: return VerificationLevel.High;
        case `VERY_HIGH`: return VerificationLevel.Highest;
        default: throw Error(`Encountered unknown verification level: ${guild.verificationLevel}`);
      }
    };

    const queryExplicitMediaContentFilter = (): ExplicitMediaContentFilter => {
      switch (guild.explicitContentFilter) {
        case `DISABLED`: return ExplicitMediaContentFilter.DontScanAny;
        case `MEMBERS_WITHOUT_ROLES`: return ExplicitMediaContentFilter.WithoutRole;
        case `ALL_MEMBERS`: return ExplicitMediaContentFilter.AllMembers;
        default: throw Error(`Encountered unknown explicit media content filter: ${guild.explicitContentFilter}`);
      }
    };

    return {
      guildId,
      name: guild.name,
      icon: guild.icon ?? null,
      inactiveChannelId: guild.afkChannelID ?? null,
      inactiveTimeout: guild.afkTimeout,
      systemMessages: {
        channelId: guild.systemChannelID ?? null,
        sendBoostMessages: !guild.systemChannelFlags.has(`BOOST_MESSAGE_DISABLED`),
        sendRandomWelcomeMessages: !guild.systemChannelFlags.has(`WELCOME_MESSAGE_DISABLED`),
      },
      defaultNotificationSetting: queryDefaultNotificationSetting(),
      verificationLevel: queryVerificationLevel(),
      explicitMediaContentFilter: queryExplicitMediaContentFilter(),
    };
  };
