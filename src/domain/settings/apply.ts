import discordjs, { Client, Guild, SystemChannelFlags } from 'discord.js';
import { FetchImageService } from '../../util/fetch-image';
import { ExplicitMediaContentFilter, NotificationSetting, VerificationLevel } from './types';
import { SettingsState } from './types';

const reason = `Applied by discordformation`;

export interface ApplySettingsCommandHandler {
  (state: SettingsState): Promise<void>
}

export const applySettingsCommandHandler = (
  client: Client,
  fetchImage: FetchImageService,
): ApplySettingsCommandHandler => {

  const applyName = async (guild: Guild, { name }: SettingsState) => {
    await guild.setName(name, reason);
  };

  const applyIcon = async (guild: Guild, { icon }: SettingsState) => {
    if (!icon) return;
    const iconImage = await fetchImage(icon);
    await guild.setIcon(iconImage, reason);
  };

  const applyInactiveChannelId = async (guild: Guild, { inactiveChannelId }: SettingsState) => {
    await guild.setAFKChannel(inactiveChannelId ?? null, reason);
  };

  const applyInactiveTimeout = async (guild: Guild, { inactiveTimeout }: SettingsState) => {
    await guild.setAFKTimeout(inactiveTimeout ?? 300, reason);
  };

  const applySystemMessages = async (guild: Guild, { systemMessages }: SettingsState) => {
    await guild.setSystemChannel(systemMessages.channelId ?? null, reason);

    let flags = 0;
    if (!systemMessages.sendBoostMessages) flags |= SystemChannelFlags.FLAGS.SUPPRESS_PREMIUM_SUBSCRIPTIONS;
    if (!systemMessages.sendRandomWelcomeMessages) flags |= SystemChannelFlags.FLAGS.SUPPRESS_JOIN_NOTIFICATIONS;
    await guild.setSystemChannelFlags(flags, reason);
  };

  const applyDefaultNotificationSettings = async (guild: Guild, { defaultNotificationSetting }: SettingsState) => {
    const notificationSettingsMap: Record<NotificationSetting, discordjs.DefaultMessageNotificationLevel> = {
      [NotificationSetting.OnlyMentions]: `ONLY_MENTIONS`,
      [NotificationSetting.AllMessages]: `ALL_MESSAGES`,
    };

    await guild.setDefaultMessageNotifications(notificationSettingsMap[defaultNotificationSetting], reason);
  };

  const applyVerificationLevel = async (guild: Guild, { verificationLevel }: SettingsState) => {
    const verificationLevelMap: Record<VerificationLevel, discordjs.VerificationLevel> = {
      [VerificationLevel.None]: `NONE`,
      [VerificationLevel.Low]: `LOW`,
      [VerificationLevel.Medium]: `MEDIUM`,
      [VerificationLevel.High]: `HIGH`,
      [VerificationLevel.Highest]: `VERY_HIGH`,
    };
    
    await guild.setVerificationLevel(verificationLevelMap[verificationLevel], reason);
  };

  const applyExplicitMediaContentFilter = async (guild: Guild, { explicitMediaContentFilter }: SettingsState) => {
    const contentFilterMap: Record<ExplicitMediaContentFilter, discordjs.ExplicitContentFilterLevel> = {
      [ExplicitMediaContentFilter.DontScanAny]: `DISABLED`,
      [ExplicitMediaContentFilter.WithoutRole]: `MEMBERS_WITHOUT_ROLES`,
      [ExplicitMediaContentFilter.AllMembers]: `ALL_MEMBERS`,
    };
    
    await guild.setExplicitContentFilter(contentFilterMap[explicitMediaContentFilter], reason);
  };

  return async state => {
    const guild = await client.guilds.fetch(state.guildId);

    await Promise.all([
      applyName(guild, state),
      applyIcon(guild, state),
      applyInactiveChannelId(guild, state),
      applyInactiveTimeout(guild, state),
      applySystemMessages(guild, state),
      applyDefaultNotificationSettings(guild, state),
      applyVerificationLevel(guild, state),
      applyExplicitMediaContentFilter(guild, state),
    ]);
  };
};
