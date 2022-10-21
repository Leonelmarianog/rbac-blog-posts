import { BaseEntity } from '../../../common/domain/base.entity';
import { AuthAction } from './auth-actions.enum';
import { Role } from './role.entity';

export class Permission extends BaseEntity {
  action: AuthAction;

  subjectId: number;

  role: Role[];
}
