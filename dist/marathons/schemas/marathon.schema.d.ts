import { Document } from 'mongoose';
export declare type MarathonDocument = Marathon & Document;
export declare class Marathon {
  name: string;
  nameId: string;
  creatorId: string;
  startDate: string;
  endDate: string;
  img: string;
  modifiedTs: string;
}
export declare const MarathonSchema: import('mongoose').Schema<
  Document<Marathon, {}>,
  import('mongoose').Model<any, any>,
  undefined
>;
