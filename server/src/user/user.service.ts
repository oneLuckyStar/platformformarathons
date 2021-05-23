import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserBody } from './user.controller';
import { UserRole } from './user.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async create(user: CreateUserBody): Promise<string> {
    const newUser = new this.userModel({
      _id: mongoose.Types.ObjectId(),
      name: user.name,
      email: user.email,
      password: await this.authService.hashPassword(user.password),
      role: user.isTeacher ? UserRole.TEACHER : UserRole.USER,
    });
    const createdUser = await newUser.save();
    return this.authService.generateJWT(createdUser);
  }

  async findOne(id: User['_id']): Promise<User> {
    const user: User | null = await this.userModel
      .findById(id)
      .select('role _id name email')
      .exec();
    return user ? user : null;
  }

  async findAll(): Promise<User[]> {
    const users: User[] | null = await this.userModel.find().exec();
    if (!users) return null;
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  deleteOne(id: User['_id']): Promise<any> {
    return this.userModel.deleteOne(id).exec();
  }

  async updateOne(id: User['_id'], user: User): Promise<any> {
    let updateUser = { ...user };
    if (user.password) {
      updateUser = {
        ...user,
        password: await this.authService.hashPassword(user.password),
      };
    }
    console.log(updateUser);

    await this.userModel.updateOne({ _id: id }, updateUser).exec();
    const newUser = await this.userModel
      .findById(id)
      .select('role _id name email password')
      .exec();
    return this.authService.generateJWT(newUser);
  }

  updateRoleOfUser(id: User['_id'], user: User): Promise<any> {
    return this.userModel.updateOne(id, user).exec();
  }

  async login(user: User): Promise<string> {
    const validUser = await this.validateUser(user.email, user.password);
    if (validUser) {
      return this.authService.generateJWT(validUser);
    } else {
      return 'Wrong Credentials';
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel
      .findOne({ email })
      .select('role _id name email password')
      .exec();
    const isValid = await this.authService.comparePasswords(
      password,
      user.password,
    );
    return isValid ? user : null;
  }

  findByMail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
