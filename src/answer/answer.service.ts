import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Answer } from './answer.schema';
import { AnswerDocument } from './answer.schema';
import { Model } from 'mongoose';
import { SendFileDto } from './dto/sendFile.dto';
import { SendResultDto } from './dto/sendResult.dto';
import { SendTextDto } from './dto/sendText.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}

  findAll(): Promise<Answer[]> {
    return this.answerModel.find().sort('modifiedTs').exec();
  }

  findMyForTask(
    marathonId: string,
    taskId: string,
    creatorId: User['_id'],
  ): Promise<Answer> {
    return this.answerModel
      .findOne({
        marathonId,
        taskId,
        creatorId,
      })
      .exec();
  }

  findAllForTask(marathonId: string, taskId: string): Promise<Answer[]> {
    return this.answerModel
      .find({
        marathonId,
        taskId,
      })
      .sort({ modifiedTs: 'desc' })
      .exec();
  }

  async addFile(
    sendFileDto: SendFileDto,
    creatorId: User['_id'],
    name,
    path,
  ): Promise<Answer> {
    const answer = await this.findMyForTask(
      sendFileDto.marathonId,
      sendFileDto.taskId,
      creatorId,
    );
    if (!answer) {
      const newAnswer = new this.answerModel({
        marathonId: sendFileDto.marathonId,
        taskId: sendFileDto.taskId,
        creatorId: creatorId,
        modifiedTs: new Date().toISOString(),
        text: '',
        result: null,
        files: [
          {
            name: name,
            path: path,
          },
        ],
      });
      await newAnswer.save();
    } else {
      await this.answerModel.updateOne(
        {
          marathonId: sendFileDto.marathonId,
          taskId: sendFileDto.taskId,
          creatorId: creatorId,
        },
        {
          files: [...answer.files, { name: name, path: path }],
          modifiedTs: new Date().toISOString(),
        },
      );
    }

    return this.findMyForTask(
      sendFileDto.marathonId,
      sendFileDto.taskId,
      creatorId,
    );
  }

  async addText(
    sendTextDto: SendTextDto,
    creatorId: User['_id'],
  ): Promise<Answer> {
    const answer = await this.findMyForTask(
      sendTextDto.marathonId,
      sendTextDto.taskId,
      creatorId,
    );
    if (!answer) {
      const newAnswer = new this.answerModel({
        marathonId: sendTextDto.marathonId,
        taskId: sendTextDto.taskId,
        creatorId: creatorId,
        modifiedTs: new Date().toISOString(),
        text: sendTextDto.text,
        result: null,
        files: [],
      });
      await newAnswer.save();
    } else {
      await this.answerModel.updateOne(
        {
          marathonId: sendTextDto.marathonId,
          taskId: sendTextDto.taskId,
          creatorId: creatorId,
        },
        {
          text: sendTextDto.text,
          modifiedTs: new Date().toISOString(),
        },
      );
    }

    return this.findMyForTask(
      sendTextDto.marathonId,
      sendTextDto.taskId,
      creatorId,
    );
  }

  async delete(
    marathonId: string,
    taskId: string,
    userId: User['_id'],
    path: string,
  ): Promise<{}> {
    return this.answerModel
      .updateOne(
        {
          marathonId,
          taskId,
          creatorId: userId,
        },
        {
          $pull: { files: { path } },
        },
      )
      .exec();
  }

  async addResult(
    sendResultDto: SendResultDto,
    creatorId: User['_id'],
  ): Promise<Answer> {
    await this.answerModel.updateOne(
      {
        marathonId: sendResultDto.marathonId,
        taskId: sendResultDto.taskId,
        creatorId: creatorId,
      },
      {
        result: sendResultDto.result,
        comment: sendResultDto.comment,
      },
    );

    return this.findMyForTask(
      sendResultDto.marathonId,
      sendResultDto.taskId,
      creatorId,
    );
  }
}
