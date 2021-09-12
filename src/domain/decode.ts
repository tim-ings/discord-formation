import * as t from 'io-ts';
import { typeWithOptionals } from '../util/validation';
import { ChannelsStackCodec } from './channels/decode';
import { EmojisStackCodec } from './emojis/decode';
import { RolesStackCodec } from './roles/decode';
import { SettingsStackCodec } from './settings/decode';

export type DiscordformationStack = t.TypeOf<typeof DiscordformationStackCodec>;

export const DiscordformationStackCodec = t.type({
  Server: typeWithOptionals(
    {
      Settings: SettingsStackCodec,
    },
    {
      Roles: RolesStackCodec,
      Emojis: EmojisStackCodec,
      Channels: ChannelsStackCodec,
    },
  ),
});
