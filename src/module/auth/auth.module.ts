import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceMapper } from './application/mapper/service.mapper';
import { UserService } from './application/service/user.service';
import { Auth0Mapper } from './infrastructure/auth0/mapper/auth0.mapper';
import { CaslAbilityFactory } from './infrastructure/casl/casl-ability.factory';
import { UserEntity } from './infrastructure/database/entity/user.entity';
import { RepositoryMapper } from './infrastructure/database/mapper/repository.mapper';
import { UserRepository } from './infrastructure/database/user.repository';
import { JwtStrategy } from './infrastructure/passport/strategy/jwt.strategy';
import { UserController } from './interface/user.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([UserEntity])],
  exports: [CaslAbilityFactory],
  controllers: [UserController],
  providers: [
    CaslAbilityFactory,
    JwtStrategy,
    Auth0Mapper,
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
