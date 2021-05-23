import {
  Controller,
  Get,
  UseGuards,
  Query,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Marathon } from '../marathon/marathon.schema';
import { UserRole } from '../user/user.interface';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTaskInfoDto } from './dto/getTaskInfo.dto';
import { GetTasksDto } from './dto/getTasks.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  getTaskInfo(@Query() query: GetTaskInfoDto): Promise<Task> {
    return this.taskService.findTaskInfo(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getNameById')
  getNameById(@Query() query: { taskId: string }): Promise<Task> {
    return this.taskService.findNameById(query.taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getTasks(@Query() query: GetTasksDto, @Request() req): Promise<Task[]> {
    return await this.taskService.findByMarathonId(query, req.user._id);
  }

  @hasRoles(UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/new')
  async create(@Body() createTaskDto: CreateTaskDto,  @Request() req): Promise<Marathon[]> {
    await this.taskService.create(createTaskDto, req.user._id);
    return this.taskService.findByMarathonId(
      {
        marathonId: createTaskDto.marathonId,
      },
      req.user._id,
    );
  }

  @hasRoles(UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/delete')
  async delete(
    @Query() query: { taskId: string; marathonId: string },
    @Request() req,
  ): Promise<Marathon[]> {
    await this.taskService.delete(query.taskId);
    return this.taskService.findByMarathonId(
      { marathonId: query.marathonId },
      req.user._id,
    );
  }
}
