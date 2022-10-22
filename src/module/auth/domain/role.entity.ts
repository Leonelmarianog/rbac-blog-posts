import { BaseEntity } from '../../../common/domain/base.entity';
import { RoleName } from './role-name.enum';

export class Role extends BaseEntity {
  name: RoleName;
}
