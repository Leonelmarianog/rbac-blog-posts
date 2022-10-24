import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { User } from '../../domain/user.entity';
import { Policy } from '../../domain/policy.entity';
import { POLICIES_KEY } from '../../application/decorator/require-policies.decorator';
import { IS_PUBLIC_KEY } from '../../application/decorator/public.decorator';

@Injectable()
export class PolicyAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly caslAbilityFactory: CaslAbilityFactory) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.getPublicDecoratorMetadata(context);

    if (isPublic) {
      return true;
    }

    try {
      await super.canActivate(context);
    } catch (error) {
      return false;
    }

    const requiredPolicies = this.getRequirePoliciesDecoratorMetadata(context);

    if (!requiredPolicies) {
      return true;
    }

    const user = this.getUserFromRequest(context);

    if (!user) {
      return false;
    }

    return this.userHasAbility(user, requiredPolicies);
  }

  private userHasAbility(user: User, policies: Policy[]): boolean {
    const userAbility = this.caslAbilityFactory.createForUser(user);

    return policies.every((policy: Policy) => {
      const hasAbility = userAbility.can(policy.action, policy.subjectId);

      console.log(`User ${user.username} ${hasAbility ? 'can' : 'cannot'} ${policy.action} ${policy.subjectId}`);

      return hasAbility;
    });
  }

  private getUserFromRequest(context: ExecutionContext): User {
    return context.switchToHttp().getRequest<{ user: User }>().user;
  }

  private getPublicDecoratorMetadata(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
  }

  private getRequirePoliciesDecoratorMetadata(context: ExecutionContext): Policy[] {
    return this.reflector.getAllAndOverride(POLICIES_KEY, [context.getHandler(), context.getClass()]);
  }
}
