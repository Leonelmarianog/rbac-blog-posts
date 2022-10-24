import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../../common/infrastructure/database/base.entity';
import { RoleName } from '../../../domain/role-name.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ name: 'external_id' })
  externalId: string;

  @Column()
  role: RoleName;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;
}
