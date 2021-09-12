import { AuditLogEventEnvelope } from './types';

export interface AuditLogReasonWriter<T = unknown> {
  (stackId: string, event: T): string
}

export const auditLogReasonWriter = (): AuditLogReasonWriter =>
  (stackId, event) => {
    const envelope: AuditLogEventEnvelope = { version: 1, provider: `DiscordFormation`, stackId, payload: event };
    return JSON.stringify(envelope);
  };
