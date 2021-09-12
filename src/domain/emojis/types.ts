import * as t from 'io-ts';
import { EmojisStackCodec } from './decode';

export type EmojisStack = t.TypeOf<typeof EmojisStackCodec>;

export type EmojisState = EmojiState[]

interface EmojiState {
  name: string
  url: string
}
