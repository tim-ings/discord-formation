import * as t from 'io-ts';

export const EmojisStackCodec = t.array(t.type({
  Name: t.string,
  Image: t.string,
}));
