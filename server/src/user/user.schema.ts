import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './user.interface';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop()
  name?: string;

  @Prop({ unique: true })
  email?: string;

  @Prop()
  password?: string;

  @Prop({ default: UserRole.USER })
  role?: UserRole;

  @Prop({ nullable: true })
  profileImage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
