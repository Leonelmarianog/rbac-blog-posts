import { Inject, Get, Param, Controller } from '@nestjs/common';
import { UserResponse } from '../application/dto/user-response.dto';
import { ServiceMapper } from '../application/mapper/service.mapper';
import { IUserService } from '../application/service/user.service.interface';
import { AuthAction } from '../domain/auth-actions.enum';
import { Policy } from '../domain/policy.entity';
import { RequirePolicies } from '../application/decorator/require-policies.decorator';
import { Public } from '../application/decorator/public.decorator';

@Controller('/api/users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    private readonly serviceMapper: ServiceMapper,
  ) {}

  @Public()
  @Get('/public')
  async publicRoute() {
    return { message: "I'm a public route!" };
  }

  @Get('/protected')
  async protectedRoute() {
    return { message: "I'm a protected route! Thanks PolicyAuthGuard!" };
  }

  @Get()
  @RequirePolicies([new Policy(AuthAction.READ, 'posts')])
  async getAll(): Promise<UserResponse[]> {
    const users = await this.userService.getAll();
    return users.map((user) => this.serviceMapper.fromUserToUserResponse(user));
  }

  @Get(':id')
  @RequirePolicies([new Policy(AuthAction.READ, 'posts')])
  async getOneById(@Param('id') id: number): Promise<UserResponse> {
    const user = await this.userService.getOneById(id);
    return this.serviceMapper.fromUserToUserResponse(user);
  }
}
