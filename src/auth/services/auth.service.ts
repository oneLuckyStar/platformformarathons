import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.schema';

@Injectable()
export class AuthService {
  private bcrypt = require('bcrypt');
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string): Promise<string> {
    return this.bcrypt.hash(password, 12);
  }

  comparePasswords(
    newPassword: string,
    passwortHash: string,
  ): Promise<boolean> {
    return this.bcrypt.compare(newPassword, passwortHash);
  }
}
