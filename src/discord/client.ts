import { Client } from 'discord.js';

export const discordBotClient = async (discordToken: string): Promise<Client> => {
  const client = new Client({ intents: [`GUILDS`, `GUILD_EMOJIS_AND_STICKERS`, `GUILD_MESSAGES`] });
  await client.login(discordToken);
  return client;
};
