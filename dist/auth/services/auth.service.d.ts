import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.schema';
export declare class AuthService {
    private readonly jwtService;
    private bcrypt;
    constructor(jwtService: JwtService);
    generateJWT(user: User): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(newPassword: string, passwortHash: string): Promise<boolean>;
}
