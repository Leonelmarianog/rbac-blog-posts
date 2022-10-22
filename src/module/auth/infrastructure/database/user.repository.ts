import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../../application/repository/user.repository.interface';
import { User } from '../../domain/user.entity';
import { UserEntity } from './entity/user.entity';
import { RepositoryMapper } from './mapper/repository.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource, private readonly repositoryMapper: RepositoryMapper) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async getAll(): Promise<User[]> {
    const userEntities = await this.repository.find({ relations: { role: true } });
    return userEntities.map((userEntity) => this.repositoryMapper.fromUserEntityToUser(userEntity));
  }

  async getOneById(id: number): Promise<User> {
    const userEntity = await this.repository.findOne({ where: { id }, relations: { role: true } });

    if (userEntity) {
      return null;
    }

    return this.repositoryMapper.fromUserEntityToUser(userEntity);
  }

  async create(user: User): Promise<User> {
    return this.repository.save({});
  }
}
