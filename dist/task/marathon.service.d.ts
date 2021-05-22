import { User } from '../user/user.schema';
import { Marathon, MarathonDocument } from './marathon.schema';
import { Model } from 'mongoose';
import { CreateMarathonDto } from './dto/create-marathon.dto';
import { Observable } from 'rxjs';
export declare class MarathonService {
    private marathonModel;
    constructor(marathonModel: Model<MarathonDocument>);
    findAll(): Observable<Marathon[]>;
    findMy(username: User['username']): Observable<Marathon[]>;
    create(createMarathonDto: CreateMarathonDto): Promise<Marathon>;
}
