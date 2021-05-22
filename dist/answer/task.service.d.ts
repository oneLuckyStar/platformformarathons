import { MarathonService } from '../marathon/marathon.service';
import { User } from '../user/user.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskInfoDto } from './dto/getTaskInfo.dto';
import { GetTasksDto } from './dto/getTasks.dto';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
export declare class TaskService {
    private taskModel;
    private marathonService;
    constructor(taskModel: Model<TaskDocument>, marathonService: MarathonService);
    findAll(): Promise<Task[]>;
    findByMarathonId(query: GetTasksDto): Promise<Task[]>;
    findTaskInfo(query: GetTaskInfoDto): Promise<Task>;
    findByName(name: Task['name'], marathonId: Task['marathonId']): Promise<Task[]>;
    create(createTaskDto: CreateTaskDto, userId: User['_id']): Promise<Task>;
    delete(nameId: Task['nameId']): Promise<{}>;
}
