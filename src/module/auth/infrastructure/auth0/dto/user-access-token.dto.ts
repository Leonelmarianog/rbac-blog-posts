import { RoleName } from '../../../domain/role-name.enum';

export class UserAccessToken {
  iss: string;
  sub: string;
  aud: string;
  iat: string;
  exp: string;
  azp: string;
  gty: string;
  permissions: string[];
  'https://rbac-user-posts.com/roles': RoleName[];
  'https://rbac-user-posts.com/email': string;
}
