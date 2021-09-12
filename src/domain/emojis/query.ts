import { Client } from 'discord.js';
import { EmojisState } from './types';

export interface EmojisStateQueryHandler {
  (guildId: string): Promise<EmojisState>
}

export const emojisStateQueryHandler = (
  client: Client
): EmojisStateQueryHandler =>
  async guildId => {
    const guild = await client.guilds.fetch(guildId);
    const emojis = Array.from(guild.emojis.cache.values());

    return emojis.map(({ name, url }) => ({ name, url }));
  };
