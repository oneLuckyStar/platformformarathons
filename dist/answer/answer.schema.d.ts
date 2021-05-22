import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type AnswerDocument = Answer & Document;
interface Files {
    path?: string;
    name?: string;
}
export declare class Answer {
    files?: Files[];
    text?: string;
    creatorId?: mongoose.Schema.Types.ObjectId;
    marathonId?: string;
    taskId?: string;
    result?: number;
    comment?: string;
    modifiedTs?: string;
}
export declare const AnswerSchema: mongoose.Schema<mongoose.Document<Answer, {}>, mongoose.Model<any, any>, undefined>;
export {};
