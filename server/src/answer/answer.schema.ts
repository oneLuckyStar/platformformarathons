import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

interface Files {
  path?: string;
  name?: string;
}

@Schema()
export class Answer {
  @Prop()
  files?: Files[];

  @Prop()
  text?: string;

  @Prop()
  creatorId?: mongoose.Schema.Types.ObjectId;

  @Prop()
  marathonId?: string;

  @Prop()
  taskId?: string;

  @Prop()
  result?: number;

  @Prop()
  comment?: string;

  @Prop()
  modifiedTs?: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
