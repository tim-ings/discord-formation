import { EmojisStateQueryHandler, emojisStateQueryHandler } from './query';

describe(`query state`, () => {

  const mockGuildsFetch = jest.fn();

  const emojis = [
    { name: `foo`, url: `http://image.local/foo.png` },
    { name: `bar`, url: `http://image.local/bar.png` },
    { name: `baz`, url: `http://image.local/baz.png` },
  ];

  let query: EmojisStateQueryHandler;

  beforeEach(() => {
    jest.resetAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query = emojisStateQueryHandler({ guilds: { fetch: mockGuildsFetch } } as any);
  });

  test(`given guild > when query > should return expected state`, async () => {
    mockGuildsFetch.mockResolvedValue({ emojis: { cache: { values: () => emojis } } });

    await expect(query(`guild-123`)).resolves.toEqual([
      { name: `foo`, url: `http://image.local/foo.png` },
      { name: `bar`, url: `http://image.local/bar.png` },
      { name: `baz`, url: `http://image.local/baz.png` },
    ]);
  });
});
