import * as t from 'io-ts';
import { fromEnum, typeUnion, typeWithOptionals } from '../../util/validation';
import { ExplicitMediaContentFilter, NotificationSetting, VerificationLevel, RolePermission, ChannelType, PermissionOverrideStatus, TextChannelPermissions, ChannelCategoryPermissions, VoiceChannelPermissions, StageChannelPermissions, AnnouncementChannelPermissions } from '../types';

export type DiscordformationStack = t.TypeOf<typeof DiscordformationStackCodec>;

const StackSettingsCodec = t.type({
  Name: t.string,
  Icon: t.string,
  InactiveChannel: t.string,
  InactiveTimeout: t.string,
  SystemMessages: t.type({
    Channel: t.string,
    SendRandomWelcomeMessages: t.boolean,
    SendBoostMessages: t.boolean,
  }),
  DefaultNotificationSetting: fromEnum<NotificationSetting>(NotificationSetting, `NotificationSetting`),
  VerificationLevel: fromEnum<VerificationLevel>(VerificationLevel, `VerificationLevel`),
  ExplicitMediaContentFilter: fromEnum<ExplicitMediaContentFilter>(ExplicitMediaContentFilter, `ExplicitMediaContentFilter`),
});

const StackRolesCodec = t.array(typeWithOptionals(
  {
    ResourceID: t.string,
    Name: t.string,
    Permissions: t.array(fromEnum<RolePermission>(RolePermission, `RolePermission`)),
  },
  {
    Color: t.string,
    DisplaySeparately: t.boolean,
    AllowAnyoneToMention: t.boolean,
  },
));

const StackEmojisCodec = t.array(t.type({
  Name: t.string,
  Image: t.string,
}));

const StackChannelsCodec = t.array(typeUnion([
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
]));

const DiscordformationStackCodec = t.type({
  Server: typeWithOptionals(
    {
      Settings: StackSettingsCodec,
    },
    {
      Roles: StackRolesCodec,
      Emojis: StackEmojisCodec,
      Channels: StackChannelsCodec,
    },
  ),
}); 

export const decodeStack = DiscordformationStackCodec.decode;
