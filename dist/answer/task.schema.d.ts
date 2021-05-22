import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type TaskDocument = Task & Document;
export declare class Task {
    name: string;
    nameId: string;
    creatorId?: mongoose.Schema.Types.ObjectId;
    startDate: string;
    endDate: string;
    text: string;
    marathonId: string;
    marathonName: string;
    isActive: boolean;
    modifiedTs: string;
}
export declare const TaskSchema: mongoose.Schema<mongoose.Document<Task, {}>, mongoose.Model<any, any>, undefined>;
