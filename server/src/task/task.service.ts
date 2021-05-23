import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { slugify } from 'transliteration';
import { AnswerService } from '../answer/answer.service';
import { Marathon } from '../marathon/marathon.schema';
import { User } from '../user/user.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskInfoDto } from './dto/getTaskInfo.dto';
import { GetTasksDto } from './dto/getTasks.dto';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private answerService: AnswerService,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.find().sort('modifiedTs').exec();
  }

  async findByMarathonId(
    query: GetTasksDto,
    userId: User['_id'],
  ): Promise<Task[]> {
    const tasks = await this.taskModel
      .find({ marathonId: query.marathonId, isActive: true })
      .select('endDate marathonId name nameId startDate creatorId')
      .sort('modifiedTs')
      .exec();
    return Promise.all(
      tasks.map(async (task) => {
        task.answer = await this.answerService.findMyForTask(
          task.marathonId,
          task.nameId,
          userId,
        );
        return task;
      }),
    );
  }

  async findTaskInfo(query: GetTaskInfoDto): Promise<Task> {
    return await this.taskModel
      .findOne({ marathonId: query.marathonId, nameId: query.taskId })
      .exec();
  }

  async findByName(
    name: Task['name'],
    marathonId: Task['marathonId'],
  ): Promise<Task[]> {
    return this.taskModel.find({ name, marathonId }).exec();
  }

  async create(
    createTaskDto: CreateTaskDto,
    userId: User['_id'],
  ): Promise<Task> {
    const newTask = new this.taskModel({
      name: createTaskDto.name,
      nameId: `${slugify(createTaskDto.name)}_${moment().format(
        'DD-MM-YYYY-HH-mm-ss',
      )}`,
      startDate: createTaskDto.startDate,
      endDate: createTaskDto.endDate,
      text: createTaskDto.text,
      marathonId: createTaskDto.marathonId,
      creatorId: userId,
      isActive: true,
      modifiedTs: new Date().toISOString(),
    });
    return newTask.save();
  }

  async delete(nameId: Task['nameId']): Promise<{}> {
    return this.taskModel.updateOne({ nameId }, { isActive: false }).exec();
  }

  async findNameById(taskId: Task['nameId']): Promise<Task> {
    return this.taskModel.findOne({ nameId: taskId }).select('name').exec();
  }

  async taskIdsByMarathonId(marathonId: Marathon['nameId']): Promise<string[]> {
    return this.taskModel.find({ marathonId }).distinct('nameId').exec();
  }
}
