import { Role } from '../../../domain/role.entity';
import { User } from '../../../domain/user.entity';
import { RoleEntity } from '../entity/role.entity';
import { UserEntity } from '../entity/user.entity';

export class RepositoryMapper {
  fromUserEntityToUser(userEntity: UserEntity): User {
    const user = new User();

    user.id = userEntity.id;
    user.username = userEntity.username;
    user.externalId = userEntity.externalId;
    user.isAdmin = userEntity.isAdmin;
    user.createdAt = userEntity.createdAt;
    user.updatedAt = userEntity.updatedAt;
    user.deletedAt = userEntity.deletedAt;

    if (userEntity.role) {
      user.role = this.fromRoleEntityToRole(userEntity.role);
    }

    return user;
  }

  fromRoleEntityToRole(roleEntity: RoleEntity): Role {
    const role = new Role();

    role.id = roleEntity.id;
    role.name = roleEntity.name;
    role.createdAt = roleEntity.createdAt;
    role.updatedAt = roleEntity.updatedAt;
    role.deletedAt = roleEntity.deletedAt;

    return role;
  }
}
