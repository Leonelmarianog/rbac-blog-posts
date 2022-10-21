import { BaseEntity } from '../../../common/domain/base.entity';
import { Role } from './role.entity';

export class Permission extends BaseEntity {
  action: string;

  subjectId: number;

  role: Role[];
}
