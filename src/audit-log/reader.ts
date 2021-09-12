import { Client, Guild, GuildAuditLogsEntry, GuildEmoji, Integration, Invite, Role, User, Webhook } from 'discord.js';
import { AuditLogEntry, AuditLogEventEnvelope } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AuditLogReader<T = any> {
  (guildId: string, stackId: string): Promise<AuditLogEntry<T>[]>
}

export const auditLogReader = (
  client: Client
): AuditLogReader => {

  const parseAuditLogEventEnvelope = (reason: string | null): AuditLogEventEnvelope | null => {
    if (reason === null) return null;
    try {
      const envelope = JSON.parse(reason) as AuditLogEventEnvelope;
      if (envelope.provider !== `DiscordFormation`) return null;
      return envelope;
    } catch {
      return null;
    }
  };

  const parsTarget = (target: GuildAuditLogsEntry[`target`]) => {
    if (target === null) return null;
    if (target instanceof Invite) return target.code;
    return target.id;
  };

  const parseAuditLogEntry = (entry: GuildAuditLogsEntry): AuditLogEntry | null => {
    const envelope = parseAuditLogEventEnvelope(entry.reason);
    if (!envelope) return null;
    return {
      auditEntryId: entry.id,
      timestamp: new Date(entry.createdTimestamp),
      action: entry.action,
      actionType: entry.actionType,
      targetType: entry.targetType,
      executor: entry.executor?.id ?? null,
      changes: entry.changes?.map(({ key, old: oldValue, new: newValue }) => ({ key, oldValue: String(oldValue), newValue: String(newValue) })) ?? [],
      target: parsTarget(entry.target),
      envelope,
    };
  };

  const collectDiscordFormationEvent = (events: AuditLogEntry[], rawEntry: GuildAuditLogsEntry): AuditLogEntry[] => {
    const entry = parseAuditLogEntry(rawEntry);
    if (entry === null) return events;
    return [...events, entry];
  };

  return async (guildId, stackId) => {
    const guild = await client.guilds.fetch(guildId);
    const logs = await guild.fetchAuditLogs({});

    return [...logs.entries.values()]
      .reduce(collectDiscordFormationEvent, [])
      .filter(entry => entry.envelope.stackId === stackId);
  };
};
