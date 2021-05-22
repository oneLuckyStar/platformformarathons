import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AnswerService } from './answer.service';
import { Answer } from './answer.schema';
import { SendFileDto } from './dto/sendFile.dto';
import { SendResultDto } from './dto/sendResult.dto';
import { SendTextDto } from './dto/sendText.dto';
export declare const storage: {
    storage: any;
};
export declare class AnswerController {
    private readonly answerService;
    private userService;
    constructor(answerService: AnswerService, userService: UserService);
    getAll(): Promise<Answer[]>;
    my(req: any, { marathonId, taskId }: {
        marathonId: string;
        taskId: string;
    }): Promise<Answer>;
    sendFile(file: any, sendFileDto: SendFileDto, req: any): Promise<Answer>;
    deleteFile({ marathonId, taskId, path, }: {
        marathonId: string;
        taskId: string;
        path: string;
    }, req: any): Promise<Answer>;
    allForTask(req: any, { marathonId, taskId }: {
        marathonId: string;
        taskId: string;
    }): Promise<(Answer & {
        creator: User;
    })[]>;
    countForTask(req: any, { marathonId, taskId }: {
        marathonId: string;
        taskId: string;
    }): Promise<number>;
    sendText(sendTextDto: SendTextDto, req: any): Promise<Answer>;
    sendResult(sendResultDto: SendResultDto, req: any): Promise<Answer>;
}
