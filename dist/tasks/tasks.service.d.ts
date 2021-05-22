import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { CreateTasksDto } from './dto/create-tasks.dto';
export declare class TasksService {
  private marathonModel;
  constructor(marathonModel: Model<TaskDocument>);
  getAllById(id: string): Promise<Task[]>;
  getTask(taskId: string, marathonId: string): Promise<Task>;
  create(createTaskDto: CreateTasksDto): Promise<Task>;
}
