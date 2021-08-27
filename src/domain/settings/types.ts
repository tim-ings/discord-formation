import { ChannelResourceReference } from '../types';

export interface SettingsState {
  guildId?: string
  name: string
  icon?: string
  inactiveChannelId?: string | ChannelResourceReference
  inactiveTimeout?: number
  systemMessages: {
    channelId?: string | ChannelResourceReference
    sendRandomWelcomeMessages: boolean
    sendBoostMessages: boolean
  }
  defaultNotificationSetting: NotificationSetting
  verificationLevel: VerificationLevel
  explicitMediaContentFilter: ExplicitMediaContentFilter
}

export enum NotificationSetting {
  AllMessages = `AllMessages`,
  OnlyMentions = `OnlyMentions`,
}

export enum VerificationLevel {
  None = `None`,
  Low = `Low`,
  Medium = `Medium`,
  High = `High`,
  Highest = `Highest`,
}

export enum ExplicitMediaContentFilter {
  DontScanAny = `DontScanAny`,
  WithoutRole = `WithoutRole`,
  AllMembers = `AllMembers`,
}
