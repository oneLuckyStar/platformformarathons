import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Answer } from '../answer/answer.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop()
  nameId: string;

  @Prop()
  creatorId?: mongoose.Schema.Types.ObjectId;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  text: string;

  @Prop()
  marathonId: string;

  @Prop()
  marathonName: string;

  @Prop()
  isActive: boolean;

  @Prop()
  modifiedTs: string;

  @Prop()
  answer: Answer;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
