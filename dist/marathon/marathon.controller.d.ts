import { MarathonService } from './marathon.service';
import { Marathon } from './marathon.schema';
import { CreateMarathonDto } from './dto/createMarathon.dto';
export declare class MarathonController {
    private readonly marathonsService;
    constructor(marathonsService: MarathonService);
    getAll(): Promise<Marathon[]>;
    getNameById(query: {
        marathonId: string;
    }): Promise<Marathon>;
    getMyMarathons(req: any): Promise<Marathon[]>;
    create(createMarathonDto: CreateMarathonDto, req: any): Promise<Marathon[]>;
    delete(query: {
        marathonId: string;
    }, req: any): Promise<Marathon[]>;
}
