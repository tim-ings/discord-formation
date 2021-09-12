import { DiscordformationStack, DiscordformationStackCodec } from './decode';
import { isLeft, isRight } from 'fp-ts/lib/Either';
import { PathReporter } from '../../util/validation';

describe(`decode`, () => {

  test(`given valid stack > when decode > should return right with no errors`, () => {
    const validStack: DiscordformationStack = {
      Server: {
        Settings: {
          Name: `Discord as Code`,
          Icon: `https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png`,
          InactiveChannel: `inactive`,
          InactiveTimeout: `5m`,
          SystemMessages: { Channel: `general`, SendRandomWelcomeMessages: true, SendBoostMessages: true },
          DefaultNotificationSetting: `AllMessages`,
          VerificationLevel: `None`,
          ExplicitMediaContentFilter: `DontScanAny`,
        },
        Roles: [{ ResourceID: `role1`, Name: `Role One`, Permissions: [`ViewChannels`] }],
        Channels: [
          { ResourceID: `c1`, Name: `hangout`, Type: `Text`, Position: 1, PermissionOverrides: { ViewChannel: `Allow` } },
          { ResourceID: `c2`, Name: `general`, Type: `Voice`, Position: 2 }, 
          { ResourceID: `c3`, Name: `announcements`, Type: `Announcement`, Position: 3 },
          { ResourceID: `c4`, Name: `stage`, Type: `Stage`, Position: 4 },
          { ResourceID: `c5`, Name: `units`, Type: `Category`, Position: 5 },
        ],
        Emojis: [{ Name: `feelsGoodMan`, Image: `feelsGoodMan.png` }],
      },
    };
    
    const decodedStack = DiscordformationStackCodec.decode(validStack);
    expect(PathReporter.report(decodedStack)).toEqual([]);
    expect(isRight(decodedStack)).toBe(true);
  });

  test(`given invalid stack > when decode > should return left with errors`, () => {
    const invalidStack = { 
      Server: {
        Settings: {},
        Roles: [{ Permissions: [123] }],
        Channels: [{ Type: `Voice` }],
        Emoji: [{}],
      },
    };

    const decodedStack = DiscordformationStackCodec.decode(invalidStack);
    expect(PathReporter.report(decodedStack)).toEqual([
      `Invalid value undefined for Server.Settings.Name expected type string`,
      `Invalid value undefined for Server.Settings.Icon expected type string`,
      `Invalid value undefined for Server.Settings.InactiveChannel expected type string`,
      `Invalid value undefined for Server.Settings.InactiveTimeout expected type string`,
      `Invalid value undefined for Server.Settings.SystemMessages expected type object`,
      `Invalid value undefined for Server.Settings.DefaultNotificationSetting expected type NotificationSetting`,
      `Invalid value undefined for Server.Settings.VerificationLevel expected type VerificationLevel`,
      `Invalid value undefined for Server.Settings.ExplicitMediaContentFilter expected type ExplicitMediaContentFilter`,
      `Invalid value undefined for Server.Roles[0].ResourceID expected type string`,
      `Invalid value undefined for Server.Roles[0].Name expected type string`,
      `Invalid value 123 for Server.Roles[0].Permissions[0] expected type RolePermission`,
      `Invalid value undefined for Server.Channels[2].ResourceID expected type string`,
      `Invalid value undefined for Server.Channels[2].Name expected type string`,
      `Invalid value undefined for Server.Channels[2].Position expected type number`,
    ]);
    expect(isLeft(decodedStack)).toBe(true);
  });
});
