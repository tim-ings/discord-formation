import { Message } from 'discord.js';
import { auditLogReader } from './discord/audit-log/reader';
import { auditLogReasonWriter } from './discord/audit-log/writer';
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

  const readLog = auditLogReader(client);

  const querySettingsState = settingsStateQueryHandler(client);
  const queryEmojisState = emojisStateQueryHandler(client);
  const queryRolesState = rolesStateQueryHandler(client);
  const queryChannelsState = channelsStateQueryHandler(client, readLog);

  const replyWithSettingsState = async (message: Message, guildId: string) => {
    const state = await querySettingsState(guildId);
    console.log(JSON.stringify({ state }, null, 4));
    await message.reply(`\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const replyWithEmojisState = async (message: Message, guildId: string) => {
    const state = await queryEmojisState(guildId);
    console.log(JSON.stringify({ state }, null, 4));
    await message.reply(`\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const replyWithRolesState = async (message: Message, guildId: string) => {
    const state = await queryRolesState(guildId);
    console.log(JSON.stringify({ state }, null, 4));
    await message.reply(`\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const replyWithChannelState = async (message: Message, guildId: string) => {
    const state = await queryChannelsState(guildId, `stack-123`);
    console.log(JSON.stringify({ state }, null, 4));
    await message.reply(`\`\`\`json\n${JSON.stringify(state, null, 2).slice(0, 1900)}\`\`\``);
  };

  const replyWithAuditLogEntries = async (message: Message, guildId: string, stackId: string) => {
    const entries = await readLog(guildId, `stack-123`);
    console.log(JSON.stringify(entries, null, 4));
    await message.reply(`\`\`\`json\n${JSON.stringify(entries, null, 2).slice(0, 1900)}\`\`\``);
  }; 

  const writeReason = auditLogReasonWriter();

  const adoptChannel = async (guildId: string, channelId: string, stackResourceId: string) => {
    console.log(`Adopting a channel`, { guildId, channelId, stackResourceId });
    const guild = await client.guilds.fetch(guildId);
    const channels = Array.from(guild.channels.cache.values());
    const channel = channels.find(x => x.id === channelId);
    if (!channel) return console.log(`did not find channel with id: '${channelId}'`);
    const currentName = channel.name;
    const event: ResourceAdoptedEvent = { eventType: DiscordFormationEventType.ResourceAdopted, stackResourceId };
    await channel.setName(stackResourceId, writeReason(`stack-123`, event));
    await channel.setName(currentName, writeReason(`stack-123`, event));

    return console.log(`channel name updated to the same name`);
  };

  client.on(`message`, message => {
    if (message.author.bot) return;
    if (!message.guild) return;

    console.log(`RECV:`, message.content);

    const parseArg = (n: number) => message.content.split(` `)[n];

    if (parseArg(0) === `!df-query-settings`) return replyWithSettingsState(message, message.guild.id);
    if (parseArg(0) === `!df-query-emojis`) return replyWithEmojisState(message, message.guild.id);
    if (parseArg(0) === `!df-query-roles`) return replyWithRolesState(message, message.guild.id);
    if (parseArg(0) === `!df-query-channels`) return replyWithChannelState(message, message.guild.id);
    if (parseArg(0) === `!df-query-audit`) return replyWithAuditLogEntries(message, message.guild.id, parseArg(1));

    if (parseArg(0) === `!df-adopt-channel`) return adoptChannel(message.guild.id, parseArg(1), parseArg(2));
  });
};

start();
