import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { UserAccessToken } from '../../auth0/dto/user-access-token.dto';
import { Auth0Mapper } from '../../auth0/mapper/auth0.mapper';
import { IUserService } from '../../../application/service/user.service.interface';
import { User } from '../../../domain/user.entity';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly auth0Mapper: Auth0Mapper,
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(userAccessToken: UserAccessToken): Promise<User> {
    let user = await this.userService.getOneByExternalId(userAccessToken.sub);

    if (!user) {
      user = await this.userService.create(this.auth0Mapper.fromUserAccessTokenToUser(userAccessToken));
    }

    return this.auth0Mapper.populatePermissions(user, userAccessToken.permissions);
  }
}
