import { Client } from 'discord.js';
import { RolesState } from './types';

export interface RolesStateQueryHandler {
  (guildId: string): Promise<RolesState>
}

export const rolesStateQueryHandler = (
  client: Client
): RolesStateQueryHandler =>
  async guildId => {
    const guild = await client.guilds.fetch(guildId);

    return [...guild.roles.cache.values()].map(role => ({
      roleId: role.id,
      name: role.name,
      color: role.hexColor,
      displaySeparately: role.hoist,
      allowAnyoneToMention: role.mentionable,
      permissions: role.permissions.toArray(),
    }));
  };
