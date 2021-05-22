import { TasksService } from './tasks.service';
import { Task } from './schemas/tasks.schema';
import {
  CreateTasksDto,
  GetAllByIdParamsDto,
  GetTaskParamsDto,
} from './dto/create-tasks.dto';
export declare class TasksController {
  private readonly tasksService;
  constructor(tasksService: TasksService);
  getAllById(reqParam: GetAllByIdParamsDto): Promise<Task[]>;
  getTask(reqParam: GetTaskParamsDto): Promise<Task>;
  create(createTaskDto: CreateTasksDto): Promise<Task>;
}
