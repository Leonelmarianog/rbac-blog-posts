import { AuthAction } from './auth-actions.enum';

export class Permission {
  action: AuthAction;

  subjectId: string;
}
