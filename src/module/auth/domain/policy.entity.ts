import { AuthAction } from './auth-actions.enum';

export class Policy {
  constructor(public action: AuthAction, public subjectId: string) {}
}
