import { Document } from 'mongoose';
export declare type TaskDocument = Task & Document;
export declare class Task {
  name: string;
  nameId: string;
  marathonId: string;
  startDate: string;
  endDate: string;
  url: string;
  modifiedTs: string;
}
export declare const TasksSchema: import('mongoose').Schema<
  Document<Task, {}>,
  import('mongoose').Model<any, any>,
  undefined
>;
