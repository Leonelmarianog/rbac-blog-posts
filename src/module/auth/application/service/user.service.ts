import { Inject } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserNotFoundException } from '../exception/user-not-found.exception';
import { IUserRepository } from '../repository/user.repository.interface';
import { IUserService } from './user.service.interface';

export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getOneById(id: number): Promise<User> {
    const user = await this.userRepository.getOneById(id);

    if (!user) {
      throw new UserNotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getOneByExternalId(externalId: string): Promise<User> {
    return this.userRepository.getOneByExternalId(externalId);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
