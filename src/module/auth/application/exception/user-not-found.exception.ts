import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description);
  }
}
