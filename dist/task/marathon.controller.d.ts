import { MarathonService } from './marathon.service';
import { Marathon } from './marathon.schema';
import { CreateMarathonDto } from './dto/create-marathon.dto';
import { Observable } from 'rxjs';
export declare class MarathonController {
    private readonly marathonsService;
    constructor(marathonsService: MarathonService);
    getAll(): Observable<Marathon[]>;
    getMyMarathons(req: any): Observable<Marathon[]>;
    create(createMarathonDto: CreateMarathonDto): Promise<Marathon>;
}
