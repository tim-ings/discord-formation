import { Client } from 'discord.js';

export const discordBotClient = async (discordToken: string): Promise<Client> => {
  const client = new Client();
  await client.login(discordToken);
  return client;
};
