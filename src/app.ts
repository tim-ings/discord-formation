import { Channel, Client, TextChannel } from 'discord.js';
import { discordBotClient } from './discord/bot-client';
import { settingsStateQueryHandler } from './domain/settings/query-state';

const env = {
  discordToken: process.env.DISCORD_TOKEN as string,
};

const fetchChannel = (client: Client) => async (id: string): Promise<Channel | undefined> => client.channels.fetch(id);

const fetchTextChannel = (client: Client) => async (id: string): Promise<TextChannel | undefined> => {
  const channel = await fetchChannel(client)(id);
  if (channel?.type !== `text`) return undefined;
  return channel as TextChannel;
};

const start = async () => {
  const client = await discordBotClient(env.discordToken);

  const querySettingsState = settingsStateQueryHandler(client);


  const sendMessage = async (channelId: string, messageBody: string) => {
    const channel = await fetchTextChannel(client)(channelId);
    if (!channel) return;
    await channel.send(messageBody);
  };

  const checkStatus = async (guildId: string, channelId: string) => {
    const state = await querySettingsState(guildId);
    console.log(`settingsState: `, JSON.stringify({ state }, null, 4));
    await sendMessage(channelId, `server state:\n\`\`\`json\n${JSON.stringify(state, null, 2)}\`\`\``);
  };

  client.on(`message`, async message => {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content.startsWith(`!discordformation querySettingsState`)) await checkStatus(message.guild.id, message.channel.id);
  });

};

start();
