import * as t from 'io-ts';
import { ResolvedChannelReference } from '../types';
import { SettingsStackCodec } from './decode';

export type SettingsStack = t.TypeOf<typeof SettingsStackCodec>;

export interface SettingsState {
  guildId: string
  name: string
  icon: string | null
  inactiveChannelId: string | null
  inactiveTimeout: number
  systemMessages: {
    channelId: string | null
    sendBoostMessages: boolean
    sendRandomWelcomeMessages: boolean
  },
  defaultNotificationSetting: NotificationSetting
  verificationLevel: VerificationLevel
  explicitMediaContentFilter: ExplicitMediaContentFilter
}

export interface ResolvedSettingsState {
  guildId: string
  name: string
  icon: string | null
  inactiveChannel: ResolvedChannelReference | null
  inactiveTimeout: number
  systemMessages: {
    channel: ResolvedChannelReference | null
    sendBoostMessages: boolean
    sendRandomWelcomeMessages: boolean
  },
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
