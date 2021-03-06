import { isRight } from 'fp-ts/lib/Either';
import { PathReporter } from '../../util/validation';
import { RolesStack } from '../roles/types';
import { ChannelsStackCodec } from './decode';

describe(`decode`, () => {
  test(`given valid channels stack > when decode > should return right with no errors`, () => {
    const validStack: RolesStack = [
      { ResourceID: `c1`, Name: `hangout`, Type: `Text`, Position: 1, PermissionOverrides: { ViewChannel: `Allow` } },
      { ResourceID: `c2`,Name: `general`,Type: `Voice`,Position: 2 },
      { ResourceID: `c3`, Name: `announcements`, Type: `Announcement`, Position: 3 },
      { ResourceID: `c4`, Name: `stage`, Type: `Stage`, Position: 4 },
      { ResourceID: `c5`, Name: `units`, Type: `Category`, Position: 5 },
    ];

    const decodedStack = ChannelsStackCodec.decode(validStack);
    expect(PathReporter.report(decodedStack)).toEqual([]);
    expect(isRight(decodedStack)).toBe(true);
  });

  test(`given invalid channels stack > when decode > should return left with errors`, () => {
    const invalidStack = [
      { ResourceID: 123, Name: false, Type: `Text`, Position: 1, PermissionOverrides: { ViewChannel: `foo` } },
      { ResourceID: false,Name: 123,Type: `Voice`, Position: undefined },
      { ResourceID: {}, Name: null, Type: null, Position: `3` },
      { ResourceID: [], Name: [1, 2 ,3], Type: `bar`, Position: false },
      { ResourceID: null, Name: { foo: `bar` }, Type: `Category`, Position: [] },
    ];
    const decodedStack = ChannelsStackCodec.decode(invalidStack);
    expect(PathReporter.report(decodedStack)).toEqual([
      `Invalid value 123 for [1].ResourceID expected type string`,
      `Invalid value false for [1].Name expected type string`,
      `Invalid value "foo" for [1].PermissionOverrides[0] expected type PermissionOverrideStatus`,
      `Invalid value "foo" for [1].PermissionOverrides[1] expected type undefined`,
      `Invalid value false for [2].ResourceID expected type string`,
      `Invalid value 123 for [2].Name expected type string`,
      `Invalid value undefined for [2].Position expected type number`,
      `Invalid value {"ResourceID":{},"Name":null,"Type":null,"Position":"3"} for unknown expected type unknown`,
      `Invalid value {"ResourceID":[],"Name":[1,2,3],"Type":"bar","Position":false} for unknown expected type unknown`,
      `Invalid value null for [0].ResourceID expected type string`,
      `Invalid value {"foo":"bar"} for [0].Name expected type string`,
      `Invalid value [] for [0].Position expected type number`,
    ]);
  });
});
