import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (err) {
      // NestJS returns 500 without uncaught errors
      if (err.code === '23505') {
        // Duplicate username
        throw new ConflictException('Username already exists');
      } else {
        // Throw a 500 otherwise
        throw new InternalServerErrorException();
      }
    }
  }
}
