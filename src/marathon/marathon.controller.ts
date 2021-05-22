import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import { hasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../user/user.interface';
import { MarathonService } from './marathon.service';
import { Marathon } from './marathon.schema';
import { CreateMarathonDto } from './dto/createMarathon.dto';

@Controller('marathon')
export class MarathonController {
  constructor(private readonly marathonsService: MarathonService) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll(): Promise<Marathon[]> {
    return this.marathonsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getNameById')
  getNameById(@Query() query: { marathonId: string }): Promise<Marathon> {
    return this.marathonsService.findNameById(query.marathonId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getMyMarathons(@Request() req): Promise<Marathon[]> {
    return this.marathonsService.findMyWithStat(req.user.email, req.user._id);
  }

  @hasRoles(UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/new')
  async create(
    @Body() createMarathonDto: CreateMarathonDto,
    @Request() req,
  ): Promise<Marathon[]> {
    await this.marathonsService.create(createMarathonDto, req.user._id);
    return this.marathonsService.findMy(req.user.email, req.user._id);
  }

  @hasRoles(UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/delete')
  async delete(
    @Query() query: { marathonId: string },
    @Request() req,
  ): Promise<Marathon[]> {
    await this.marathonsService.delete(query.marathonId);
    return this.marathonsService.findMy(req.user.email, req.user._id);
  }
}
