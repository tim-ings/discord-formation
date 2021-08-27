export enum ResourceReferenceType {
  Channel = `Channel`,
  Role = `Role`,
}

export interface ChannelResourceReference {
  type: ResourceReferenceType.Channel
  channelId: string
}

export interface RoleResourceReference {
  type: ResourceReferenceType.Role
  roleId: string
}

export type ResourceReference
  = ChannelResourceReference
  | RoleResourceReference
