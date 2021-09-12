import * as t from 'io-ts';
import { ChannelsStackCodec } from './decode';

export type ChannelsStack = t.TypeOf<typeof ChannelsStackCodec>;

export type ChannelState
  = CategoryChannelState
  | TextChannelState
  | VoiceChannelState
  | StageChannelState
  | AnnouncementChannelState

export type ChannelOverride<T extends string> = { [key in T]?: PermissionOverrideStatus }

interface CategoryChannelState {
  resourceId: string
  type: ChannelType.Category
  name: string
  position: number
  permissionOverrides?: ChannelOverride<ChannelCategoryPermissions>
}

interface TextChannelState {
  resourceId: string
  type: ChannelType.Text
  name: string
  position: number
  permissionOverrides?: ChannelOverride<TextChannelPermissions>
}

interface VoiceChannelState {
  resourceId: string
  type: ChannelType.Voice
  name: string
  position: number
  permissionOverrides?: ChannelOverride<VoiceChannelPermissions>
}

interface StageChannelState {
  resourceId: string
  type: ChannelType.Stage
  name: string
  position: number
  permissionOverrides?: ChannelOverride<StageChannelPermissions>
}

interface AnnouncementChannelState {
  resourceId: string
  type: ChannelType.Announcement
  name: string
  position: number
  permissionOverrides?: ChannelOverride<AnnouncementChannelPermissions>
}

export enum ChannelType {
  Category = `Category`,
  Text = `Text`,
  Voice = `Voice`,
  Stage = `Stage`,
  Announcement = `Announcement`,
}

export enum PermissionOverrideStatus {
  Deny = `Deny`,
  Allow = `Allow`,
}

export enum ChannelCategoryPermissions {
  ViewChannels = `ViewChannels`,
  ManageChannels = `ManageChannels`,
  ManagePermissions = `ManagePermissions`,
  ManageWebhooks = `ManageWebhooks`,
  CreateInvite = `CreateInvite`,
  SendMessages = `SendMessages`,
  UsePublicThreads = `UsePublicThreads`,
  UsePrivateThreads = `UsePrivateThreads`,
  EmbedLinks = `EmbedLinks`,
  AttachFiles = `AttachFiles`,
  AddReactions = `AddReactions`,
  UseExternalemoji = `UseExternalemoji`,
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
  RequestToSpeak = `RequestToSpeak`,
}

export enum TextChannelPermissions {
  ViewChannel = `ViewChannel`,
  ManageChannel = `ManageChannel`,
  ManagePermissions = `ManagePermissions`,
  ManageWebhooks = `ManageWebhooks`,
  CreateInvite = `CreateInvite`,
  SendMessages = `SendMessages`,
  UsePublicThreads = `UsePublicThreads`,
  UsePrivateThreads = `UsePrivateThreads`,
  EmbedLinks = `EmbedLinks`,
  AttachFiles = `AttachFiles`,
  AddReactions = `AddReactions`,
  UseExternalemoji = `UseExternalemoji`,
  UseExternalStickers = `UseExternalStickers`,
  MentionEveryoneHereAndAllRoles = `MentionEveryoneHereAndAllRoles`,
  ManageMessages = `ManageMessages`,
  ManageThreads = `ManageThreads`,
  ReadMessageHistory = `ReadMessageHistory`,
  SendTextToSpeechMessages = `SendTextToSpeechMessages`,
  UseApplicationCommands = `UseApplicationCommands`,
}

export enum VoiceChannelPermissions {
  ViewChannel = `ViewChannel`,
  ManageChannel = `ManageChannel`,
  ManagePermissions = `ManagePermissions`,
  CreateInvite = `CreateInvite`,
  Connect = `Connect`,
  Speak = `Speak`,
  Video = `Video`,
  UseVoiceActivity = `UseVoiceActivity`,
  PrioritySpeaker = `PrioritySpeaker`,
  MuteMembers = `MuteMembers`,
  DeafenMembers = `DeafenMembers`,
  MoveMembers = `MoveMembers`,
}

export enum AnnouncementChannelPermissions {
  ViewChannel = `ViewChannel`,
  ManageChannel = `ManageChannel`,
  ManagePermissions = `ManagePermissions`,
  ManageWebhooks = `ManageWebhooks`,
  CreateInvite = `CreateInvite`,
  SendMessages = `SendMessages`,
  UsePublicThreads = `UsePublicThreads`,
  EmbedLinks = `EmbedLinks`,
  AttachFiles = `AttachFiles`,
  AddReactions = `AddReactions`,
  UseExternalemoji = `UseExternalemoji`,
  UseExternalStickers = `UseExternalStickers`,
  MentionEveryoneHereAndAllRoles = `MentionEveryoneHereAndAllRoles`,
  ManageMessages = `ManageMessages`,
  ManageThreads = `ManageThreads`,
  ReadMessageHistory = `ReadMessageHistory`,
  SendTextToSpeechMessages = `SendTextToSpeechMessages`,
  UseApplicationCommands = `UseApplicationCommands`,
}

export enum StageChannelPermissions {
  ViewChannel = `ViewChannel`,
  ManageChannel = `ManageChannel`,
  ManagePermissions = `ManagePermissions`,
  CreateInvite = `CreateInvite`,
  Connect = `Connect`,
  MuteMembers = `MuteMembers`,
  MoveMembers = `MoveMembers`,
}
