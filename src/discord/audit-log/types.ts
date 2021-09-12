export interface AuditLogEventEnvelope<T = unknown> {
  version: number
  provider: `DiscordFormation`
  stackId: string
  payload: T
}

export interface AuditLogEntry<T = unknown> {
  auditEntryId: string
  timestamp: Date,
  action: AuditAction,
  actionType: AuditActionType
  targetType: AuditTargetType,
  executor: string | null,
  changes: Array<{ key: string, oldValue: string, newValue: string }>
  target: string | null
  envelope: AuditLogEventEnvelope<T>,
}

export type AuditAction
  = `ALL`
  | `GUILD_UPDATE`
  | `CHANNEL_CREATE`
  | `CHANNEL_UPDATE`
  | `CHANNEL_DELETE`
  | `CHANNEL_OVERWRITE_CREATE`
  | `CHANNEL_OVERWRITE_UPDATE`
  | `CHANNEL_OVERWRITE_DELETE`
  | `MEMBER_KICK`
  | `MEMBER_PRUNE`
  | `MEMBER_BAN_ADD`
  | `MEMBER_BAN_REMOVE`
  | `MEMBER_UPDATE`
  | `MEMBER_ROLE_UPDATE`
  | `MEMBER_MOVE`
  | `MEMBER_DISCONNECT`
  | `BOT_ADD`
  | `ROLE_CREATE`
  | `ROLE_UPDATE`
  | `ROLE_DELETE`
  | `INVITE_CREATE`
  | `INVITE_UPDATE`
  | `INVITE_DELETE`
  | `WEBHOOK_CREATE`
  | `WEBHOOK_UPDATE`
  | `WEBHOOK_DELETE`
  | `EMOJI_CREATE`
  | `EMOJI_UPDATE`
  | `EMOJI_DELETE`
  | `MESSAGE_DELETE`
  | `MESSAGE_BULK_DELETE`
  | `MESSAGE_PIN`
  | `MESSAGE_UNPIN`
  | `INTEGRATION_CREATE`
  | `INTEGRATION_UPDATE`
  | `INTEGRATION_DELETE`
  | `STAGE_INSTANCE_CREATE`
  | `STAGE_INSTANCE_UPDATE`
  | `STAGE_INSTANCE_DELETE`
  | `STICKER_CREATE`
  | `STICKER_UPDATE`
  | `STICKER_DELETE`
  | `THREAD_CREATE`
  | `THREAD_UPDATE`
  | `THREAD_DELETE`

export type AuditActionType
  = `ALL`
  | `CREATE`
  | `DELETE`
  | `UPDATE`

export type AuditTargetType
  = `ALL`
  | `GUILD`
  | `CHANNEL`
  | `USER`
  | `ROLE`
  | `INVITE`
  | `WEBHOOK`
  | `EMOJI`
  | `MESSAGE`
  | `INTEGRATION`
  | `STAGE_INSTANCE`
  | `STICKER`
  | `THREAD`
  | `UNKNOWN`;
