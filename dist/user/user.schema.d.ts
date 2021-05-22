import { UserRole } from './user.interface';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    _id?: mongoose.Schema.Types.ObjectId;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, {}>, mongoose.Model<any, any>, undefined>;
