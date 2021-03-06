import * as t from 'io-ts';
import { RolesStackCodec } from './decode';

export type RolesStack = t.TypeOf<typeof RolesStackCodec>;

export type RolesState = any//RoleState[]

// interface RoleState {

// }

export enum RolePermission {
  ViewChannels = `ViewChannels`,
  ManageChannels = `ManageChannels`,
  ManageRoles = `ManageRoles`,
  ManageEmojisAndStickers = `ManageEmojisAndStickers`,
  ViewAuditLog = `ViewAuditLog`,
  ManageWebhooks = `ManageWebhooks`,
  ManageServer = `ManageServer`,
  CreateInvite = `CreateInvite`,
  ChangeNickname = `ChangeNickname`,
  ManageNicknames = `ManageNicknames`,
  KickMembers = `KickMembers`,
  BanMembers = `BanMembers`,
  SendMessages = `SendMessages`,
  SendMessagesInThreads = `SendMessagesInThreads`,
  UsePublicThreads = `UsePublicThreads`,
  UsePrivateThreads = `UsePrivateThreads`,
  EmbedLinks = `EmbedLinks`,
  AttachFiles = `AttachFiles`,
  AddReactions = `AddReactions`,
  UseExternalEmoji = `UseExternalEmoji`,
  UseExternalStickers = `UseExternalStickers`,
  MentionEveryoneHereAndAllRoles = `MentionEveryoneHereAndAllRoles`,
  ManageMessages = `ManageMessages`,
  ManageThreads = `ManageThreads`,
  ReadMessageHistory = `ReadMessageHistory`,
  SendTextToSpeechMessages = `SendTextToSpeechMessages`,
  UseApplicationCommands = `UseApplicationCommands`,
  Connect = `Connect`,
  Speak = `Speak`,
  Video = `Video`,
  UseVoiceActivity = `UseVoiceActivity`,
  PrioritySpeaker = `PrioritySpeaker`,
  MuteMembers = `MuteMembers`,
  DeafenMembers = `DeafenMembers`,
  MoveMembers = `MoveMembers`,
  Administrator = `Administrator`,
}
