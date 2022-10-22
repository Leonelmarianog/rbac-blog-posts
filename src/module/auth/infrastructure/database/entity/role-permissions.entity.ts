import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../../common/infrastructure/database/base.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'role_permissions' })
export class RolePermissions extends BaseEntity {
  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'permission_id' })
  permissionId: number;

  @ManyToOne('RoleEntity', 'rolePermissions')
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne('PermissionEntity', 'rolePermissions')
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;
}
