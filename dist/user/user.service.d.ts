import { AuthService } from 'src/auth/services/auth.service';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    private authService;
    constructor(userModel: Model<UserDocument>, authService: AuthService);
    findOne(id: User['_id']): Promise<User>;
    findAll(): Promise<User[]>;
    deleteOne(id: User['_id']): Promise<any>;
    updateOne(id: User['_id'], user: User): Promise<any>;
    updateRoleOfUser(id: User['_id'], user: User): Promise<any>;
    login(user: User): Promise<string>;
    validateUser(email: string, password: string): Promise<User>;
    findByMail(email: string): Promise<User>;
}
