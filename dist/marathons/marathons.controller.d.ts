import { MarathonsService } from './marathons.service';
import { Marathon } from './schemas/marathon.schema';
import { CreateMarathonDto } from './dto/create-marathon.dto';
export declare class MarathonsController {
  private readonly marathonsService;
  constructor(marathonsService: MarathonsService);
  getAll(): Promise<Marathon[]>;
  getMyMarathons(): Promise<Marathon[]>;
  create(createMarathonDto: CreateMarathonDto): Promise<Marathon>;
}
