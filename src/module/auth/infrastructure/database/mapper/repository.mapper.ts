import { RoleName } from '../../../domain/role-name.enum';
import { Role } from '../../../domain/role.entity';
import { User } from '../../../domain/user.entity';
import { UserEntity } from '../entity/user.entity';

export class RepositoryMapper {
  fromUserEntityToUser(userEntity: UserEntity): User {
    const user = new User();

    user.id = userEntity.id;
    user.username = userEntity.username;
    user.externalId = userEntity.externalId;
    user.isAdmin = userEntity.isAdmin;
    user.role = this.createRole(userEntity.role);
    user.createdAt = userEntity.createdAt;
    user.updatedAt = userEntity.updatedAt;
    user.deletedAt = userEntity.deletedAt;

    return user;
  }

  fromUserToUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();

    userEntity.username = user.username;
    userEntity.externalId = user.externalId;
    userEntity.isAdmin = user.isAdmin;
    userEntity.role = user.role.name;

    return userEntity;
  }

  createRole(roleName: RoleName): Role {
    const role = new Role();

    role.name = roleName;

    return role;
  }
}
