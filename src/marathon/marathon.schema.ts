import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';

export type MarathonDocument = Marathon & Document;

@Schema()
export class MarathonStat {
  @Prop()
  taskCount: number;

  @Prop()
  doneCount: number;

  @Prop()
  skipCount: number;
}

@Schema()
export class Marathon {
  @Prop()
  name?: string;

  @Prop()
  nameId?: string;

  @Prop()
  creatorId?: mongoose.Schema.Types.ObjectId;

  @Prop()
  creatorInfo?: User;

  @Prop()
  startDate?: string;

  @Prop()
  endDate?: string;

  @Prop()
  img?: string;

  @Prop()
  modifiedTs?: string;

  @Prop()
  subscribers?: [string];

  @Prop()
  isActive?: boolean;

  @Prop()
  stat?: MarathonStat;
}

export const MarathonSchema = SchemaFactory.createForClass(Marathon);
