import { Client } from 'discord.js';
import { EmojiState } from './types';

export interface EmojisStateQueryHandler {
  (guildId: string): Promise<EmojiState[]>
}

export const emojisStateQueryHandler = (
  client: Client
): EmojisStateQueryHandler =>
  async guildId => {
    const guild = await client.guilds.fetch(guildId);

    return [...guild.emojis.cache.values()]
      .map(({ name, url }) => ({ name: name ?? ``, url }));
  };
