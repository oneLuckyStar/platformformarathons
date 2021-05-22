import { Marathon } from '../marathon/marathon.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskInfoDto } from './dto/getTaskInfo.dto';
import { GetTasksDto } from './dto/getTasks.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAll(): Promise<Task[]>;
    getTaskInfo(query: GetTaskInfoDto): Promise<Task>;
    getNameById(query: {
        taskId: string;
    }): Promise<Task>;
    getTasks(query: GetTasksDto, req: any): Promise<Task[]>;
    create(createTaskDto: CreateTaskDto, req: any): Promise<Marathon[]>;
    delete(query: {
        taskId: string;
        marathonId: string;
    }, req: any): Promise<Marathon[]>;
}
