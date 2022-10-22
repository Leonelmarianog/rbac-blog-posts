import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../../common/infrastructure/database/base.entity';
import { RoleName } from '../../../domain/role-name.enum';
import { RolePermissions } from './role-permissions.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @Column()
  name: RoleName;

  @OneToMany('RolePermissions', 'role')
  rolePermissions: RolePermissions[];
}
