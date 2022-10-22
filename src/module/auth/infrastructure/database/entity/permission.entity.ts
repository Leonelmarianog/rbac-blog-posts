import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../../common/infrastructure/database/base.entity';
import { AuthAction } from '../../../domain/auth-actions.enum';
import { RolePermissions } from './role-permissions.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity {
  @Column()
  action: AuthAction;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @OneToMany('RolePermissions', 'permission')
  rolePermissions: RolePermissions[];
}
