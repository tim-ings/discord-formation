export enum ResourceReferenceType {
  Channel = `Channel`,
  Role = `Role`,
}

export interface ChannelResourceReference {
  type: ResourceReferenceType.Channel
  channelId: string
}

export interface RoleResourceReference {
  type: ResourceReferenceType.Role
  roleId: string
}

export type ResourceReference
  = ChannelResourceReference
  | RoleResourceReference

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
  SendMessagesInThreads = `SendMessagesInThreads`,
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
  SendMessagesInThreads = `SendMessagesInThreads`,
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
  SendMessagesInThreads = `SendMessagesInThreads`,
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
