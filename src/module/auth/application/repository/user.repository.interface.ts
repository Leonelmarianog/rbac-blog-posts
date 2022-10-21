import { User } from '../../domain/user.entity';

export interface IUserRepository {
  getAll(): Promise<User[]>;

  getOneById(id: number): Promise<User>;

  create(user: User): Promise<User>;
}
