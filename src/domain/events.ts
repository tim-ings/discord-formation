export type DiscordFormationEvent
  = ResourceAdoptedEvent
  | ResourceSyncedEvent

export enum DiscordFormationEventType {
  ResourceAdopted = `ResourceAdopted`,
  ResourceSynced = `ResourceSynced`,
}

export interface ResourceAdoptedEvent {
  eventType: DiscordFormationEventType.ResourceAdopted
  stackResourceId: string
}

export interface ResourceSyncedEvent {
  eventType: DiscordFormationEventType.ResourceSynced
  stackResourceId: string
}
