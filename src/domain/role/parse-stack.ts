import { RolePermission } from './types';

export interface RoleStackResource {
  ResourceID: string
  Name: string
  Color?: string
  DisplaySeparately?: boolean
  AllowAnyoneToMention?: boolean
  Permissions: RolePermission[]
}
