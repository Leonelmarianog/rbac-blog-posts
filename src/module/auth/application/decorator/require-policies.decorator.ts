import { SetMetadata } from '@nestjs/common';
import { Policy } from '../../domain/policy.entity';

export const POLICIES_KEY = 'policies';

export const RequirePolicies = (policies: Policy[]) => SetMetadata(POLICIES_KEY, policies);
