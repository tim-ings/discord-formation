import * as t from 'io-ts';

export type EmojisStack = t.TypeOf<typeof EmojisStackCodec>;

export const EmojisStackCodec = t.array(t.type({
  Name: t.string,
  Image: t.string,
}));
