import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceMapper } from './application/mapper/service.mapper';
import { UserService } from './application/service/user.service';
import { PermissionEntity } from './infrastructure/database/entity/permission.entity';
import { RolePermissions } from './infrastructure/database/entity/role-permissions.entity';
import { RoleEntity } from './infrastructure/database/entity/role.entity';
import { UserEntity } from './infrastructure/database/entity/user.entity';
import { RepositoryMapper } from './infrastructure/database/mapper/repository.mapper';
import { UserRepository } from './infrastructure/database/user.repository';
import { UserController } from './interface/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissions, PermissionEntity, RoleEntity, UserEntity])],
  controllers: [UserController],
  providers: [
    ServiceMapper,
    RepositoryMapper,
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
