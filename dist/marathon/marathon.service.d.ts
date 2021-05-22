import { TaskService } from '../task/task.service';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { Marathon, MarathonDocument } from './marathon.schema';
import { Model } from 'mongoose';
import { CreateMarathonDto } from './dto/createMarathon.dto';
export declare class MarathonService {
    private marathonModel;
    private userService;
    private taskService;
    constructor(marathonModel: Model<MarathonDocument>, userService: UserService, taskService: TaskService);
    findAll(): Promise<Marathon[]>;
    findMy(email: User['email'], id: User['_id']): Promise<Marathon[]>;
    findMyWithStat(email: User['email'], id: User['_id']): Promise<Marathon[]>;
    findById(nameId: Marathon['nameId']): Promise<Marathon>;
    create(createMarathonDto: CreateMarathonDto, id: User['_id']): Promise<Marathon>;
    findByName(name: Marathon['name']): Promise<Marathon[]>;
    findNameById(marathonId: Marathon['nameId']): Promise<Marathon>;
    delete(nameId: Marathon['nameId']): Promise<{}>;
}
