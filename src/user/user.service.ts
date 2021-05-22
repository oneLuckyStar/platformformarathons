import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { MongoRepository, ObjectID } from 'typeorm';
// import { User, UserRole } from './models/user.interface';
// import { Observable, from, throwError } from 'rxjs';
// import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  // create(user: User): Observable<User> {
  //   return this.authService.hashPassword(user.password).pipe(
  //     switchMap((passwordHash: string) => {
  //       const newUser = {
  //         name: user.name,
  //         username: user.username,
  //         email: user.email,
  //         password: passwordHash,
  //         role: UserRole.USER
  //       };
  //
  //       return from(this.userModel.save(newUser)).pipe(
  //         map((user: User) => {
  //           const { password, ...result } = user;
  //           return result;
  //         }),
  //         catchError((err) => throwError(err)),
  //       );
  //     }),
  //   );
  // }

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
