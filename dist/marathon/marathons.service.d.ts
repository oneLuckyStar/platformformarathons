import { Marathon, MarathonDocument } from './schemas/marathon.schema';
import { Model } from 'mongoose';
import { CreateMarathonDto } from './dto/create-marathon.dto';
export declare class MarathonsService {
  private marathonModel;
  constructor(marathonModel: Model<MarathonDocument>);
  getAll(): Promise<Marathon[]>;
  create(createMarathonDto: CreateMarathonDto): Promise<Marathon>;
}
