import { RolesStack, RolesStackCodec } from './decode';
import { isLeft, isRight } from 'fp-ts/lib/Either';
import { PathReporter } from '../../../util/validation';
import { RolePermission } from '../../types';

describe(`decode`, () => {
  test(`given valid roles stack > when decode > should return right with no errors`, () => {
    const validStack: RolesStack = [
      { ResourceID: `admin`, Name: `Admin`, Permissions: [RolePermission.Administrator] },
      { ResourceID: `mod`, Name: `Moderator`, Permissions: [RolePermission.ManageChannels, RolePermission.ManageMessages] },
      { ResourceID: `contributor`, Name: `Contributor`, Permissions: [RolePermission.SendMessages, RolePermission.Connect] },
    ];

    const decodedStack = RolesStackCodec.decode(validStack);
    expect(PathReporter.report(decodedStack)).toEqual([]);
    expect(isRight(decodedStack)).toBe(true);
  });

  test(`given invalid roles stack > when decode > should return left with errors`, () => {
    const invalidStack: RolesStack = [
      { ResourceID: 123, Name: null, Permissions: {} },
      { ResourceID: [1, 2, 3], Name: { foo: 123 }, Permissions: true },
    ];

    const decodedStack = RolesStackCodec.decode(invalidStack);
    expect(PathReporter.report(decodedStack)).toEqual([
      `Invalid value 123 for [0].ResourceID expected type string`,
      `Invalid value null for [0].Name expected type string`,
      `Invalid value {} for [0].Permissions expected type Array<RolePermission>`,
      `Invalid value [1,2,3] for [1].ResourceID expected type string`,
      `Invalid value {"foo":123} for [1].Name expected type string`,
      `Invalid value true for [1].Permissions expected type Array<RolePermission>`,
    ]);
    expect(isLeft(decodedStack)).toBe(true);
  });
});
