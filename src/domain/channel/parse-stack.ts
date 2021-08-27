import { ChannelResourceReference } from '../types';
import { ChannelType, ChannelCategoryPermissions, TextChannelPermissions, VoiceChannelPermissions, StageChannelPermissions, AnnouncementChannelPermissions, PermissionOverrideStatus } from './types';

export interface ChannelCategoryStackResource {
  ResourceID: string
  Name: string
  Type: ChannelType.Category
  Position: number
  PermissionOverrides?: Record<ChannelCategoryPermissions, PermissionOverrideStatus | undefined>
}

export interface TextChannelStackResource {
  ResourceID: string
  Name: string
  Category: ChannelResourceReference
  Type: ChannelType.Text
  Position: number
  PermissionOverrides?: Record<TextChannelPermissions, PermissionOverrideStatus | undefined>
}

export interface VoiceChannelStackResource {
  ResourceID: string
  Name: string
  Category: ChannelResourceReference
  Type: ChannelType.Voice
  Position: number
  PermissionOverrides?: Record<VoiceChannelPermissions, PermissionOverrideStatus | undefined>
}

export interface StageChannelStackResource {
  ResourceID: string
  Name: string
  Category: ChannelResourceReference
  Type: ChannelType.Stage
  Position: number
  PermissionOverrides?: Record<StageChannelPermissions, PermissionOverrideStatus | undefined>
}

export interface AnnouncementChannelStackResource {
  ResourceID: string
  Name: string
  Category: ChannelResourceReference
  Type: ChannelType.Announcement
  Position: number
  PermissionOverrides?: Record<AnnouncementChannelPermissions, PermissionOverrideStatus | undefined>
}

export type ChannelStackResource
  = ChannelCategoryStackResource
  | TextChannelStackResource
  | VoiceChannelStackResource
  | StageChannelStackResource
  | AnnouncementChannelStackResource
