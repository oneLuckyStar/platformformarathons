import { AnswerService } from '../answer/answer.service';
import { Marathon } from '../marathon/marathon.schema';
import { User } from '../user/user.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskInfoDto } from './dto/getTaskInfo.dto';
import { GetTasksDto } from './dto/getTasks.dto';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
export declare class TaskService {
    private taskModel;
    private answerService;
    constructor(taskModel: Model<TaskDocument>, answerService: AnswerService);
    findAll(): Promise<Task[]>;
    findByMarathonId(query: GetTasksDto, userId: User['_id']): Promise<Task[]>;
    findTaskInfo(query: GetTaskInfoDto): Promise<Task>;
    findByName(name: Task['name'], marathonId: Task['marathonId']): Promise<Task[]>;
    create(createTaskDto: CreateTaskDto, userId: User['_id']): Promise<Task>;
    delete(nameId: Task['nameId']): Promise<{}>;
    findNameById(taskId: Task['nameId']): Promise<Task>;
    taskIdsByMarathonId(marathonId: Marathon['nameId']): Promise<string[]>;
}
