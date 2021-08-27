import { SettingsStateQueryHandler, settingsStateQueryHandler } from './query-state';
import { ExplicitMediaContentFilter, NotificationSetting, SettingsState, VerificationLevel } from './types';

describe(`query state`, () => {

  const mockHasSystemChannelFlags = jest.fn();
  const mockGuildsFetch = jest.fn();

  const guild = {
    name: `Test Guild`,
    icon: `https://test.local/image.png`,
    afkChannelID: `c-123`,
    afkTimeout: 300,
    systemChannelID: `c-234`,
    systemChannelFlags: { has: mockHasSystemChannelFlags },
    defaultMessageNotifications: `ALL`,
    verificationLevel: `LOW`,
    explicitContentFilter: `ALL_MEMBERS`,
  };

  let query: SettingsStateQueryHandler;

  beforeEach(() => {
    jest.resetAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query = settingsStateQueryHandler({ guilds: { fetch: mockGuildsFetch } } as any);
  });

  test(`given guild > when query > should return expected state`, async () => {
    mockGuildsFetch.mockResolvedValue(guild);

    await expect(query(`guild-123`)).resolves.toEqual<SettingsState>({
      guildId: `guild-123`,
      name: `Test Guild`,
      icon: `https://test.local/image.png`,
      inactiveChannelId: `c-123`,
      inactiveTimeout: 300,
      systemMessages: {
        channelId: `c-234`,
        sendBoostMessages: true,
        sendRandomWelcomeMessages: true,
      },
      defaultNotificationSetting: NotificationSetting.AllMessages,
      verificationLevel: VerificationLevel.Low,
      explicitMediaContentFilter: ExplicitMediaContentFilter.AllMembers,
    });
  });

  test(`given guild with no icon > when query > should return undefined icon state`, async () => {
    mockGuildsFetch.mockResolvedValue({ ...guild, icon: null });

    await expect(query(`guild-123`)).resolves.toMatchObject<DeepPartial<SettingsState>>({
      icon: undefined,
    });
  });

  test(`given guild with no inactive channel > when query > should return undefined inactive channel id`, async () => {
    mockGuildsFetch.mockResolvedValue({ ...guild, afkChannelID: null });

    await expect(query(`guild-123`)).resolves.toMatchObject<DeepPartial<SettingsState>>({
      inactiveChannelId: undefined,
    });
  });

  test(`given guild with no system messages channel > when query > should return undefined system messages channel id`, async () => {
    mockGuildsFetch.mockResolvedValue({ ...guild, systemChannelID: null });

    await expect(query(`guild-123`)).resolves.toMatchObject<DeepPartial<SettingsState>>({
      systemMessages: { 
        channelId: undefined,
      },
    });
  });

  test(`given guild with system message flags disabled > when query > should return state with disabled flags`, async () => {
    mockGuildsFetch.mockResolvedValue(guild);
    mockHasSystemChannelFlags.mockReturnValue(true);

    await expect(query(`guild-123`)).resolves.toMatchObject<DeepPartial<SettingsState>>({
      systemMessages: { 
        sendBoostMessages: false,
        sendRandomWelcomeMessages: false,
      },
    });
  });

  test.each([
    [`ALL`, NotificationSetting.AllMessages],
    [`MENTIONS`, NotificationSetting.OnlyMentions],
  ])(`given default notification setting %p > when query > should return state with expected notification setting`, async (discordSetting, expectedSetting) => {
    mockGuildsFetch.mockResolvedValue({ ...guild, defaultMessageNotifications: discordSetting });

    await expect(query(`guild-123`)).resolves.toMatchObject<DeepPartial<SettingsState>>({
      defaultNotificationSetting: expectedSetting,
    });
  });

  test(`given unknown default notification setting > when query > should throw`, async () => {
    mockGuildsFetch.mockResolvedValue({ ...guild, defaultMessageNotifications: `foo` });
    await expect(query(`guild-123`)).rejects.toThrowError(`Encountered unknown default notification setting: foo`);
  });
  
  test(`given unknown verification level > when query > should throw`, async () => {
    mockGuildsFetch.mockResolvedValue({ ...guild, verificationLevel: `foo` });
    await expect(query(`guild-123`)).rejects.toThrowError(`Encountered unknown verification level: foo`);
  });
  
  test(`given unknown explicit media content filter > when query > should throw`, async () => {
    mockGuildsFetch.mockResolvedValue({ ...guild, explicitContentFilter: `foo` });
    await expect(query(`guild-123`)).rejects.toThrowError(`Encountered unknown explicit media content filter: foo`);
  });
});
