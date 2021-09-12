import * as t from 'io-ts';
import { typeUnion, typeWithOptionals, fromEnum } from '../../util/validation';
import { ChannelCategoryPermissions, PermissionOverrideStatus, TextChannelPermissions, VoiceChannelPermissions, StageChannelPermissions, AnnouncementChannelPermissions, ChannelType } from './types';

export const ChannelsStackCodec = t.array(typeUnion([
  typeWithOptionals(
    {
      ResourceID: t.string,
      Name: t.string,
      Type: t.literal(ChannelType.Category),
      Position: t.number,
    },
    {
      PermissionOverrides: t.record(
        fromEnum<ChannelCategoryPermissions>(ChannelCategoryPermissions, `ChannelCategoryPermissions`),
        typeUnion([fromEnum<PermissionOverrideStatus>(PermissionOverrideStatus, `PermissionOverrideStatus`), t.undefined])
      ),
    },
  ),
  typeWithOptionals(
    {
      ResourceID: t.string,
      Name: t.string,
      Type: t.literal(ChannelType.Text),
      Position: t.number,
    },
    {
      PermissionOverrides: t.record(
        fromEnum<TextChannelPermissions>(TextChannelPermissions, `TextChannelPermissions`),
        typeUnion([fromEnum<PermissionOverrideStatus>(PermissionOverrideStatus, `PermissionOverrideStatus`), t.undefined])
      ),
    },
  ),
  typeWithOptionals(
    {
      ResourceID: t.string,
      Name: t.string,
      Type: t.literal(ChannelType.Voice),
      Position: t.number,
    },
    {
      PermissionOverrides: t.record(
        fromEnum<VoiceChannelPermissions>(VoiceChannelPermissions, `VoiceChannelPermissions`),
        typeUnion([fromEnum<PermissionOverrideStatus>(PermissionOverrideStatus, `PermissionOverrideStatus`), t.undefined])
      ),
    },
  ),
  typeWithOptionals(
    {
      ResourceID: t.string,
      Name: t.string,
      Type: t.literal(ChannelType.Stage),
      Position: t.number,
    },
    {
      PermissionOverrides: t.record(
        fromEnum<StageChannelPermissions>(StageChannelPermissions, `StageChannelPermissions`),
        typeUnion([fromEnum<PermissionOverrideStatus>(PermissionOverrideStatus, `PermissionOverrideStatus`), t.undefined])
      ),
    },
  ),
  typeWithOptionals(
    {
      ResourceID: t.string,
      Name: t.string,
      Type: t.literal(ChannelType.Announcement),
      Position: t.number,
    },
    {
      PermissionOverrides: t.record(
        fromEnum<AnnouncementChannelPermissions>(AnnouncementChannelPermissions, `AnnouncementChannelPermissions`),
        typeUnion([fromEnum<PermissionOverrideStatus>(PermissionOverrideStatus, `PermissionOverrideStatus`), t.undefined])
      ),
    }
  ),
]), `channels`);
