import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    // Injects UserRepository's instance as a class member
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
}
