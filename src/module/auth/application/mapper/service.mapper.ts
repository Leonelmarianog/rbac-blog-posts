import { User } from '../../domain/user.entity';
import { UserResponse } from '../dto/user-response.dto';

export class ServiceMapper {
  fromUserToUserResponse(user: User): UserResponse {
    const userResponse = new UserResponse();

    userResponse.username = user.username;
    userResponse.role = user.role;

    return userResponse;
  }
}
