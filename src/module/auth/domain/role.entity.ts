import { Permission } from './permission.entity';
import { RoleName } from './role-name.enum';

export class Role {
  name: RoleName;

  permissions?: Permission[];
}
