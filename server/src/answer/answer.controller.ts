import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../user/user.interface';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AnswerService } from './answer.service';
import { Answer } from './answer.schema';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { SendFileDto } from './dto/sendFile.dto';
import { SendResultDto } from './dto/sendResult.dto';
import { SendTextDto } from './dto/sendText.dto';

export const storage = {
  storage: diskStorage({
    destination: './public/uploads/answers',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('answer')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService,
    private userService: UserService,
  ) {}

  @hasRoles(UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll(): Promise<Answer[]> {
    return this.answerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  my(
    @Request() req,
    @Query()
    { marathonId, taskId }: { marathonId: string; taskId: string },
  ): Promise<Answer> {
    return this.answerService.findMyForTask(marathonId, taskId, req.user._id);
  }

  @UseInterceptors(FileInterceptor('file', storage))
  @UseGuards(JwtAuthGuard)
  @Post('sendFile')
  async sendFile(
    @UploadedFile() file: any,
    @Body() sendFileDto: SendFileDto,
    @Request() req,
  ): Promise<Answer> {
    return this.answerService.addFile(
      sendFileDto,
      req.user._id,
      file.originalname,
      file.path,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('deleteFile')
  async deleteFile(
    @Query()
    {
      marathonId,
      taskId,
      path,
    }: { marathonId: string; taskId: string; path: string },
    @Request() req,
  ): Promise<Answer> {
    await this.answerService.delete(marathonId, taskId, req.user._id, path);
    return this.answerService.findMyForTask(marathonId, taskId, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('allForTask')
  async allForTask(
    @Request() req,
    @Query()
    { marathonId, taskId }: { marathonId: string; taskId: string },
  ): Promise<(Answer & { creator: User })[]> {
    const answers = await this.answerService.findAllForTask(marathonId, taskId);
    return Promise.all(
      answers.map(async (answer) => {
        return {
          files: answer.files,
          text: answer.text,
          creatorId: answer.creatorId,
          taskId: answer.taskId,
          marathonId: answer.marathonId,
          modifiedTs: answer.modifiedTs,
          result: answer.result,
          comment: answer.comment,
          creator: await this.userService.findOne(answer.creatorId),
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('countForTask')
  async countForTask(
    @Request() req,
    @Query()
    { marathonId, taskId }: { marathonId: string; taskId: string },
  ): Promise<number> {
    return (await this.answerService.findAllForTask(marathonId, taskId)).length;
  }

  @UseGuards(JwtAuthGuard)
  @Post('sendText')
  async sendText(
    @Body() sendTextDto: SendTextDto,
    @Request() req,
  ): Promise<Answer> {
    return await this.answerService.addText(sendTextDto, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sendResult')
  async sendResult(
    @Body() sendResultDto: SendResultDto,
    @Request() req,
  ): Promise<Answer> {
    return await this.answerService.addResult(sendResultDto, req.user._id);
  }
}
