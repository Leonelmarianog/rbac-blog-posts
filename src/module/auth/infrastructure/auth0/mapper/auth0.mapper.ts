import { AuthAction } from '../../../domain/auth-actions.enum';
import { Permission } from '../../../domain/permission.entity';
import { RoleName } from '../../../domain/role-name.enum';
import { Role } from '../../../domain/role.entity';
import { User } from '../../../domain/user.entity';
import { UserAccessToken } from '../dto/user-access-token.dto';

export class Auth0Mapper {
  fromUserAccessTokenToUser(userAccessToken: UserAccessToken): User {
    const user = new User();

    user.externalId = userAccessToken.sub;
    user.username = userAccessToken['https://rbac-user-posts.com/email'];

    const roleNames = userAccessToken['https://rbac-user-posts.com/roles']; // ['Role1', 'Role2', ...]
    user.role = this.createRole(roleNames[0]);

    return user;
  }

  populatePermissions(user: User, permissions: string[]): User {
    user.role.permissions = permissions.map((permission) => this.createPermission(permission));
    return user;
  }

  private createRole(roleName: RoleName): Role {
    const role = new Role();

    role.name = roleName;

    return role;
  }

  private createPermission(permissionName: string) {
    const permission = new Permission();

    const [action, subjectId] = permissionName.split(':') as [AuthAction, string];
    permission.action = action;
    permission.subjectId = subjectId;

    return permission;
  }
}
