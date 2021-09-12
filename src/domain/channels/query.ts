import { GuildChannel, Client, PermissionString, ThreadChannel } from 'discord.js';
import { AuditLogReader } from '../../audit-log/reader';
import { DiscordFormationEvent } from '../events';
import { ChannelState, ChannelType, TextChannelPermissions } from './types';

export interface ChannelsStateQueryHandler {
  (guildId: string, stackId: string): Promise<ChannelState[]>
}

export const channelsStateQueryHandler = (
  client: Client,
  readLog: AuditLogReader<DiscordFormationEvent>,
): ChannelsStateQueryHandler => {

  const queryChannel = async (guildId: string, channelId: string) => {
    const guild = await client.guilds.fetch(guildId);
    const channel = guild.channels.cache.get(channelId);
    return channel;
  };

  const parseChannelType = (type: string): ChannelType => {
    switch (type) {
      case `text`: return ChannelType.Text;
      case `voice`: return ChannelType.Voice;
      case `category`: return ChannelType.Category;
      case `news`: return ChannelType.Announcement;
      default: return ChannelType.Text;
    }
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

  const parseChannel = (resourceId: string, channel: GuildChannel | ThreadChannel | undefined): ChannelState | undefined => {
    if (!channel || channel instanceof ThreadChannel) return;

    console.log(`overrides`, JSON.stringify({ overrides: [...channel.permissionOverwrites.cache.values()].map(o => ({ allow: o.allow.toArray(), deny: o.deny.toArray() })) }, null, 2));
    switch (channel.type) {
      case `GUILD_TEXT`: {
        return { name: channel.name, type: ChannelType.Text, position: channel.position, resourceId };
      }
      case `GUILD_VOICE`:
        return { name: channel.name, type: ChannelType.Voice, position: channel.position, resourceId };
      case `GUILD_CATEGORY`:
        return { name: channel.name, type: ChannelType.Category, position: channel.position, resourceId };
      case `GUILD_NEWS`:
        return { name: channel.name, type: ChannelType.Announcement, position: channel.position, resourceId };
      case `GUILD_STAGE_VOICE`:
        return { name: channel.name, type: ChannelType.Stage, position: channel.position, resourceId };
    }
  };

  return async (guildId, stackId) => {
    const entries = await readLog(guildId, stackId);
    
    const channels = new Map<string, ChannelState>();

    for (const { target, targetType, envelope: { payload: { stackResourceId } } } of entries) {
      if (target === null || targetType !== `CHANNEL`) continue;
      const channel = parseChannel(stackResourceId, await queryChannel(guildId, target));
      if (channel) channels.set(stackResourceId, channel);
    }

    return [...channels.values()];
  };
};
