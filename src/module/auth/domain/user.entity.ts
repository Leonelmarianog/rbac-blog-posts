import { BaseEntity } from '../../../common/domain/base.entity';
import { Role } from './role.entity';

export class User extends BaseEntity {
  username: string;

  externalId: string;

  isAdmin = false;

  role: Role;
}
