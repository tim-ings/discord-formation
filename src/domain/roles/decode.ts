import * as t from 'io-ts';
import { typeWithOptionals, fromEnum } from '../../util/validation';
import { RolePermission } from './types';

export const RolesStackCodec = t.array(typeWithOptionals(
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
