import { Message } from 'discord.js';
import { auditLogReader } from './audit-log/reader';
import { auditLogReasonWriter } from './audit-log/writer';
import { discordBotClient } from './discord/client';
import { channelsStateQueryHandler } from './domain/channels/query';
import { emojisStateQueryHandler } from './domain/emojis/query';
import { DiscordFormationEventType, ResourceAdoptedEvent } from './domain/events';
import { rolesStateQueryHandler } from './domain/roles/query';
import { settingsStateQueryHandler } from './domain/settings/query';

const env = {
  discordToken: process.env.DISCORD_TOKEN as string,
};

const start = async () => {
  const client = await discordBotClient(env.discordToken);

  const reader = auditLogReader(client);

  const querySettingsState = settingsStateQueryHandler(client);
  const queryEmojisState = emojisStateQueryHandler(client);
  const queryRolesState = rolesStateQueryHandler(client);
  const queryChannelsState = channelsStateQueryHandler(client, reader);

  const replyWithSettingsState = async (message: Message, guildId: string) => {
    const state = await querySettingsState(guildId);
    console.log(`settingsState: `, JSON.stringify({ state }, null, 4));
    await message.reply(`settings state:\n\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const replyWithEmojisState = async (message: Message, guildId: string) => {
    const state = await queryEmojisState(guildId);
    console.log(`emojisState: `, JSON.stringify({ state }, null, 4));
    await message.reply(`emojis state:\n\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const replyWithRolesState = async (message: Message, guildId: string) => {
    const state = await queryRolesState(guildId);
    console.log(`rolesState: `, JSON.stringify({ state }, null, 4));
    await message.reply(`roles state:\n\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const replyWithChannelState = async (message: Message, guildId: string) => {
    const state = await queryChannelsState(guildId, `stack-123`);
    console.log(`rolesState: `, JSON.stringify({ state }, null, 4));
    await message.reply(`roles state:\n\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const readAuditLog = async (guildId: string) => {
    const guild = await client.guilds.fetch(guildId);
    const logs = await guild.fetchAuditLogs({});
    const entries = Array.from(logs.entries.values());
    console.log(`audit logs: `, JSON.stringify({ logs: entries.map(e => e.toJSON()) }, null, 4));
  };

  const writeReason = auditLogReasonWriter();

  const adoptChannel = async (guildId: string) => {
    const guild = await client.guilds.fetch(guildId);
    const channels = Array.from(guild.channels.cache.values());
    const channel = channels.find(x => x.id === `878543561707094016`);
    if (!channel) return console.log(`did not find`);
    const currentName = channel.name;
    const event: ResourceAdoptedEvent = { eventType: DiscordFormationEventType.ResourceAdopted, stackResourceId: `resource-123` };
    await channel.setName(`ADOPTING ${currentName}`, writeReason(`stack-123`, event));
    await channel.setName(currentName, writeReason(`stack-123`, event));

    return console.log(`channel name updated to the same name`);
  };

  client.on(`message`, message => {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content.startsWith(`!df query settings`)) return replyWithSettingsState(message, message.guild.id);
    if (message.content.startsWith(`!df query emojis`)) return replyWithEmojisState(message, message.guild.id);
    if (message.content.startsWith(`!df query roles`)) return replyWithRolesState(message, message.guild.id);
    if (message.content.startsWith(`!df query channels`)) return replyWithChannelState(message, message.guild.id);

    if (message.content.startsWith(`!df read audit`)) return readAuditLog(message.guild.id);
    if (message.content.startsWith(`!df adopt channel`)) return adoptChannel(message.guild.id);
  });
};

start();
