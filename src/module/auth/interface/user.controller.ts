import { Inject, Get, Param, Controller } from '@nestjs/common';
import { UserResponse } from '../application/dto/user-response.dto';
import { ServiceMapper } from '../application/mapper/service.mapper';
import { IUserService } from '../application/service/user.service.interface';

@Controller('/api/users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    private readonly serviceMapper: ServiceMapper,
  ) {}

  @Get()
  async getAll(): Promise<UserResponse[]> {
    const users = await this.userService.getAll();
    return users.map((user) => this.serviceMapper.fromUserToUserResponse(user));
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<UserResponse> {
    const user = await this.userService.getOneById(id);
    return this.serviceMapper.fromUserToUserResponse(user);
  }
}
