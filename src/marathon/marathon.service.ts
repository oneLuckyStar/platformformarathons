import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskService } from '../task/task.service';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { Marathon, MarathonDocument } from './marathon.schema';
import { Model } from 'mongoose';
import { CreateMarathonDto } from './dto/createMarathon.dto';
import { slugify } from 'transliteration';
import * as moment from 'moment';

@Injectable()
export class MarathonService {
  constructor(
    @InjectModel(Marathon.name) private marathonModel: Model<MarathonDocument>,
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  findAll(): Promise<Marathon[]> {
    return this.marathonModel.find().sort('modifiedTs').exec();
  }

  async findMy(email: User['email'], id: User['_id']): Promise<Marathon[]> {
    const marathons: Marathon[] = await this.marathonModel
      .find({
        $or: [{ subscribers: email }, { creatorId: id }],
        isActive: true,
      })
      .sort({ modifiedTs: 'desc' })
      .exec();
    return Promise.all(
      marathons.map(async (marathon) => {
        marathon.creatorInfo = await this.userService.findOne(
          marathon.creatorId,
        );
        return marathon;
      }),
    );
  }

  async findMyWithStat(
    email: User['email'],
    id: User['_id'],
  ): Promise<Marathon[]> {
    const marathons = await this.findMy(email, id);
    return Promise.all(
      marathons.map(async (marathon) => {
        const taskIds = await this.taskService.taskIdsByMarathonId(
          marathon.nameId,
        );
        marathon.stat = {
          taskCount: taskIds.length,
          doneCount: 1,
          skipCount: 0,
        };
        return marathon;
      }),
    );
  }

  async findById(nameId: Marathon['nameId']): Promise<Marathon> {
    return this.marathonModel.findOne({ nameId }).exec();
  }

  async create(
    createMarathonDto: CreateMarathonDto,
    id: User['_id'],
  ): Promise<Marathon> {
    const newMarathon = new this.marathonModel({
      name: createMarathonDto.name,
      nameId: `${slugify(createMarathonDto.name)}_${moment().format(
        'DD-MM-YYYY-HH-mm-ss',
      )}`,
      creatorId: id,
      startDate: createMarathonDto.startDate,
      endDate: createMarathonDto.endDate,
      img: createMarathonDto.img,
      modifiedTs: new Date().toISOString(),
      subscribers: createMarathonDto.subscribers,
      isActive: true,
    });
    return newMarathon.save();
  }

  async findByName(name: Marathon['name']): Promise<Marathon[]> {
    return this.marathonModel.find({ name }).exec();
  }

  async findNameById(marathonId: Marathon['nameId']): Promise<Marathon> {
    return this.marathonModel
      .findOne({ nameId: marathonId })
      .select('name')
      .exec();
  }

  async delete(nameId: Marathon['nameId']): Promise<{}> {
    return this.marathonModel.updateOne({ nameId }, { isActive: false }).exec();
  }
}
