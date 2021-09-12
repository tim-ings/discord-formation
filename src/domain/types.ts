export enum ResourceReferenceType {
  Channel = `Channel`,
  Role = `Role`,
}

export interface ResolvedChannelReference {
  type: ResourceReferenceType.Channel
  channelId: string
}

export interface ResolvedRoleReference {
  type: ResourceReferenceType.Role
  roleId: string
}

export type ResolvedReference
  = ResolvedChannelReference
  | ResolvedRoleReference
