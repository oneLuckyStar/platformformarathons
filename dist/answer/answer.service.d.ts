import { User } from '../user/user.schema';
import { Answer } from './answer.schema';
import { AnswerDocument } from './answer.schema';
import { Model } from 'mongoose';
import { SendFileDto } from './dto/sendFile.dto';
import { SendResultDto } from './dto/sendResult.dto';
import { SendTextDto } from './dto/sendText.dto';
export declare class AnswerService {
    private answerModel;
    constructor(answerModel: Model<AnswerDocument>);
    findAll(): Promise<Answer[]>;
    findMyForTask(marathonId: string, taskId: string, creatorId: User['_id']): Promise<Answer>;
    findAllForTask(marathonId: string, taskId: string): Promise<Answer[]>;
    addFile(sendFileDto: SendFileDto, creatorId: User['_id'], name: any, path: any): Promise<Answer>;
    addText(sendTextDto: SendTextDto, creatorId: User['_id']): Promise<Answer>;
    delete(marathonId: string, taskId: string, userId: User['_id'], path: string): Promise<{}>;
    addResult(sendResultDto: SendResultDto, creatorId: User['_id']): Promise<Answer>;
}
