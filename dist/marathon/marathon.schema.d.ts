import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
export declare type MarathonDocument = Marathon & Document;
export declare class MarathonStat {
    taskCount: number;
    doneCount: number;
    skipCount: number;
}
export declare class Marathon {
    name?: string;
    nameId?: string;
    creatorId?: mongoose.Schema.Types.ObjectId;
    creatorInfo?: User;
    startDate?: string;
    endDate?: string;
    img?: string;
    modifiedTs?: string;
    subscribers?: [string];
    isActive?: boolean;
    stat?: MarathonStat;
}
export declare const MarathonSchema: mongoose.Schema<Document<Marathon, {}>, mongoose.Model<any, any>, undefined>;
