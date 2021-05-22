import { UserService } from './user.service';
import { User } from './user.schema';
export declare const storage: {
    storage: any;
};
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(user: User): Promise<Object>;
    me(req: any): User;
    findOne(params: any): Promise<User>;
    deleteOne(id: User['_id']): Promise<any>;
    updateOne(user: User, req: any): Promise<Object>;
    updateRoleOfUser(id: User['_id'], user: User): Promise<User>;
    findProfileImage(imagename: any, res: any): Promise<Object>;
}
