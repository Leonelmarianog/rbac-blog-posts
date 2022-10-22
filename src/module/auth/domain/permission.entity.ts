import { BaseEntity } from '../../../common/domain/base.entity';
import { AuthAction } from './auth-actions.enum';

export class Permission extends BaseEntity {
  action: AuthAction;

  subjectId: number;
}
