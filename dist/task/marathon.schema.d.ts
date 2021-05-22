import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type MarathonDocument = Marathon & Document;
export declare class Marathon {
    _id?: mongoose.Schema.Types.ObjectId;
    name: string;
    nameId: string;
    creatorId: mongoose.Schema.Types.ObjectId;
    startDate: string;
    endDate: string;
    img: string;
    modifiedTs: string;
    subscribers: [string];
}
export declare const MarathonSchema: mongoose.Schema<Document<Marathon, {}>, mongoose.Model<any, any>, undefined>;
