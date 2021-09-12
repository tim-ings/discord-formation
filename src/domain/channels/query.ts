import { GuildChannel, Client, PermissionString, ThreadChannel, PermissionOverwriteManager } from 'discord.js';
import { AuditLogReader } from '../../discord/audit-log/reader';
import { notUndefined as isDefined } from '../../util/array';
import { DiscordFormationEvent } from '../events';
import { AnnouncementChannelPermissions, ChannelCategoryPermissions, ChannelOverride, ChannelState, ChannelType, PermissionOverrideStatus, StageChannelPermissions, TextChannelPermissions, VoiceChannelPermissions } from './types';

export interface ChannelsStateQueryHandler {
  (guildId: string, stackId: string): Promise<ChannelState[]>
}

export const channelsStateQueryHandler = (
  client: Client,
  readLog: AuditLogReader<DiscordFormationEvent>,
): ChannelsStateQueryHandler => {

  const queryChannel = async (guildId: string, channelId: string) => {
    const guild = await client.guilds.fetch(guildId);
    return guild.channels.cache.get(channelId);
  };

  return async (guildId, stackId) => {
    const entries = await readLog(guildId, stackId);
    
    const channels = new Map<string, ChannelState>();

    for (const { target, targetType, envelope: { payload: { stackResourceId } } } of entries.reverse()) {
      if (target === null || targetType !== `CHANNEL`) continue;
      const channel = parseChannel(stackResourceId, await queryChannel(guildId, target));
      if (channel) channels.set(stackResourceId, channel);
    }

    return [...channels.values()];
  };
};

const parseChannel = (resourceId: string, channel: GuildChannel | ThreadChannel | undefined): ChannelState | undefined => {
  if (!channel || channel instanceof ThreadChannel) return;

  console.log(`overrides`, JSON.stringify({ overrides: [...channel.permissionOverwrites.cache.values()].map(o => ({ allow: o.allow.toArray(), deny: o.deny.toArray() })) }, null, 2));
  switch (channel.type) {
    case `GUILD_TEXT`:
      return { 
        name: channel.name, type: ChannelType.Text, position: channel.position, resourceId,
        permissionOverrides: parseOverrides(parseTextChannelPermission, channel.permissionOverwrites),
      };
    case `GUILD_VOICE`:
      return { 
        name: channel.name, type: ChannelType.Voice, position: channel.position, resourceId,
        permissionOverrides: parseOverrides(parseVoiceChannelPermission, channel.permissionOverwrites), 
      };
    case `GUILD_CATEGORY`:
      return {
        name: channel.name, type: ChannelType.Category, position: channel.position, resourceId,
        permissionOverrides: parseOverrides(parseChannelCategoryPermissions, channel.permissionOverwrites), 
      };
    case `GUILD_NEWS`:
      return {
        name: channel.name, type: ChannelType.Announcement, position: channel.position, resourceId, 
        permissionOverrides: parseOverrides(parseAnnouncementChannelPermission, channel.permissionOverwrites), 
      };
    case `GUILD_STAGE_VOICE`:
      return {
        name: channel.name, type: ChannelType.Stage, position: channel.position, resourceId,
        permissionOverrides: parseOverrides(parseStageChannelPermission, channel.permissionOverwrites), 
      };
  }
};

const parseOverrides = <T extends string>(parsePermission: (permission: PermissionString) => T | undefined, permissionOverwrites: PermissionOverwriteManager): ChannelOverride<T> => {
  const rawOverrides = permissionOverwrites.cache.find(() => true);

  const allowOverrides = rawOverrides?.allow.toArray()
    .map(parsePermission)
    .filter(isDefined)
    .reduce((overrides, allow) => ({ ...overrides, [allow]: PermissionOverrideStatus.Allow }), {});
  const denyOverrides = rawOverrides?.deny.toArray()
    .map(parsePermission)
    .filter(isDefined)
    .reduce((overrides, deny) => ({ ...overrides, [deny]: PermissionOverrideStatus.Deny }), {});

  return { ...allowOverrides, ...denyOverrides };
};

const parseTextChannelPermission = (permission: PermissionString): TextChannelPermissions | undefined => {
  switch (permission) {
    case `ADD_REACTIONS`: return TextChannelPermissions.AddReactions;
    case `ATTACH_FILES`: return TextChannelPermissions.AttachFiles;
    case `CREATE_INSTANT_INVITE`: return TextChannelPermissions.CreateInvite;
    case `EMBED_LINKS`: return TextChannelPermissions.EmbedLinks;
    case `MANAGE_CHANNELS`: return TextChannelPermissions.ManageChannel;
    case `MANAGE_MESSAGES`: return TextChannelPermissions.ManageMessages;
    case `MANAGE_ROLES`: return TextChannelPermissions.ManagePermissions;
    case `MANAGE_THREADS`: return TextChannelPermissions.ManageThreads;
    case `MANAGE_WEBHOOKS`: return TextChannelPermissions.ManageWebhooks;
    case `MENTION_EVERYONE`: return TextChannelPermissions.MentionEveryoneHereAndAllRoles;
    case `READ_MESSAGE_HISTORY`: return TextChannelPermissions.ReadMessageHistory;
    case `SEND_MESSAGES`: return TextChannelPermissions.SendMessages;
    case `SEND_TTS_MESSAGES`: return TextChannelPermissions.SendTextToSpeechMessages;
    case `USE_APPLICATION_COMMANDS`: return TextChannelPermissions.UseApplicationCommands;
    case `USE_EXTERNAL_STICKERS`: return TextChannelPermissions.UseExternalStickers;
    case `USE_EXTERNAL_EMOJIS`: return TextChannelPermissions.UseExternalemoji;
    case `USE_PRIVATE_THREADS`: return TextChannelPermissions.UsePrivateThreads;
    case `USE_PUBLIC_THREADS`: return TextChannelPermissions.UsePublicThreads;
    case `VIEW_CHANNEL`: return TextChannelPermissions.ViewChannel;
    default: return undefined;
  }
};

const parseVoiceChannelPermission = (permission: PermissionString): VoiceChannelPermissions | undefined => {
  switch (permission) {
    case `CONNECT`: return VoiceChannelPermissions.Connect;
    case `CREATE_INSTANT_INVITE`: return VoiceChannelPermissions.CreateInvite;
    case `DEAFEN_MEMBERS`: return VoiceChannelPermissions.DeafenMembers;
    case `MANAGE_CHANNELS`: return VoiceChannelPermissions.ManageChannel;
    case `MANAGE_ROLES`: return VoiceChannelPermissions.ManagePermissions;
    case `MOVE_MEMBERS`: return VoiceChannelPermissions.MoveMembers;
    case `MUTE_MEMBERS`: return VoiceChannelPermissions.MuteMembers;
    case `PRIORITY_SPEAKER`: return VoiceChannelPermissions.PrioritySpeaker;
    case `SPEAK`: return VoiceChannelPermissions.Speak;
    case `USE_VAD`: return VoiceChannelPermissions.UseVoiceActivity;
    case `STREAM`: return VoiceChannelPermissions.Video;
    case `VIEW_CHANNEL`: return VoiceChannelPermissions.ViewChannel;
    default: return undefined;
  }
};

const parseChannelCategoryPermissions = (permission: PermissionString): ChannelCategoryPermissions | undefined => {
  switch (permission) {
    case `ADD_REACTIONS`: return ChannelCategoryPermissions.AddReactions;
    case `ATTACH_FILES`: return ChannelCategoryPermissions.AttachFiles;
    case `CONNECT`: return ChannelCategoryPermissions.Connect;
    case `CREATE_INSTANT_INVITE`: return ChannelCategoryPermissions.CreateInvite;
    case `DEAFEN_MEMBERS`: return ChannelCategoryPermissions.DeafenMembers;
    case `EMBED_LINKS`: return ChannelCategoryPermissions.EmbedLinks;
    case `MANAGE_CHANNELS`: return ChannelCategoryPermissions.ManageChannels;
    case `MANAGE_MESSAGES`: return ChannelCategoryPermissions.ManageMessages;
    case `MANAGE_ROLES`: return ChannelCategoryPermissions.ManagePermissions;
    case `MANAGE_THREADS`: return ChannelCategoryPermissions.ManageThreads;
    case `MANAGE_WEBHOOKS`: return ChannelCategoryPermissions.ManageWebhooks;
    case `MENTION_EVERYONE`: return ChannelCategoryPermissions.MentionEveryoneHereAndAllRoles;
    case `MOVE_MEMBERS`: return ChannelCategoryPermissions.MoveMembers;
    case `MUTE_MEMBERS`: return ChannelCategoryPermissions.MuteMembers;
    case `PRIORITY_SPEAKER`: return ChannelCategoryPermissions.PrioritySpeaker;
    case `READ_MESSAGE_HISTORY`: return ChannelCategoryPermissions.ReadMessageHistory;
    case `REQUEST_TO_SPEAK`: return ChannelCategoryPermissions.RequestToSpeak;
    case `SEND_MESSAGES`: return ChannelCategoryPermissions.SendMessages;
    case `SEND_TTS_MESSAGES`: return ChannelCategoryPermissions.SendTextToSpeechMessages;
    case `SPEAK`: return ChannelCategoryPermissions.Speak;
    case `USE_APPLICATION_COMMANDS`: return ChannelCategoryPermissions.UseApplicationCommands;
    case `USE_EXTERNAL_STICKERS`: return ChannelCategoryPermissions.UseExternalStickers;
    case `USE_EXTERNAL_EMOJIS`: return ChannelCategoryPermissions.UseExternalemoji;
    case `USE_PRIVATE_THREADS`: return ChannelCategoryPermissions.UsePrivateThreads;
    case `USE_PUBLIC_THREADS`: return ChannelCategoryPermissions.UsePublicThreads;
    case `USE_VAD`: return ChannelCategoryPermissions.UseVoiceActivity;
    case `STREAM`: return ChannelCategoryPermissions.Video;
    case `VIEW_CHANNEL`: return ChannelCategoryPermissions.ViewChannels;
    default: return undefined;
  }
};

const parseAnnouncementChannelPermission = (permission: PermissionString): AnnouncementChannelPermissions | undefined => {
  switch (permission) {
    case `ADD_REACTIONS`: return AnnouncementChannelPermissions.AddReactions;
    case `ATTACH_FILES`: return AnnouncementChannelPermissions.AttachFiles;
    case `CREATE_INSTANT_INVITE`: return AnnouncementChannelPermissions.CreateInvite;
    case `EMBED_LINKS`: return AnnouncementChannelPermissions.EmbedLinks;
    case `MANAGE_CHANNELS`: return AnnouncementChannelPermissions.ManageChannel;
    case `MANAGE_MESSAGES`: return AnnouncementChannelPermissions.ManageMessages;
    case `MANAGE_ROLES`: return AnnouncementChannelPermissions.ManagePermissions;
    case `MANAGE_THREADS`: return AnnouncementChannelPermissions.ManageThreads;
    case `MANAGE_WEBHOOKS`: return AnnouncementChannelPermissions.ManageWebhooks;
    case `MENTION_EVERYONE`: return AnnouncementChannelPermissions.MentionEveryoneHereAndAllRoles;
    case `READ_MESSAGE_HISTORY`: return AnnouncementChannelPermissions.ReadMessageHistory;
    case `SEND_MESSAGES`: return AnnouncementChannelPermissions.SendMessages;
    case `SEND_TTS_MESSAGES`: return AnnouncementChannelPermissions.SendTextToSpeechMessages;
    case `USE_APPLICATION_COMMANDS`: return AnnouncementChannelPermissions.UseApplicationCommands;
    case `USE_EXTERNAL_STICKERS`: return AnnouncementChannelPermissions.UseExternalStickers;
    case `USE_EXTERNAL_EMOJIS`: return AnnouncementChannelPermissions.UseExternalemoji;
    case `USE_PUBLIC_THREADS`: return AnnouncementChannelPermissions.UsePublicThreads;
    case `VIEW_CHANNEL`: return AnnouncementChannelPermissions.ViewChannel;
    default: return undefined;
  }
};

const parseStageChannelPermission = (permission: PermissionString): StageChannelPermissions | undefined => {
  switch (permission) {
    case `CONNECT`: return StageChannelPermissions.Connect;
    case `CREATE_INSTANT_INVITE`: return StageChannelPermissions.CreateInvite;
    case `MANAGE_CHANNELS`: return StageChannelPermissions.ManageChannel;
    case `MANAGE_ROLES`: return StageChannelPermissions.ManagePermissions;
    case `MOVE_MEMBERS`: return StageChannelPermissions.MoveMembers;
    case `MUTE_MEMBERS`: return StageChannelPermissions.MuteMembers;
    case `VIEW_CHANNEL`: return StageChannelPermissions.ViewChannel;
    default: return undefined;
  }
};
