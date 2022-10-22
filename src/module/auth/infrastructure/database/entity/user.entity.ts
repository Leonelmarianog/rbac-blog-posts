import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../../common/infrastructure/database/base.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ name: 'external_id' })
  externalId: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ name: 'role_id' })
  roleId: number;

  @OneToOne('RoleEntity')
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
