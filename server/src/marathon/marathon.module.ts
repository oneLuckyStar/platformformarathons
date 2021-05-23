import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';
import { MarathonController } from './marathon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Marathon, MarathonSchema } from './marathon.schema';
import { MarathonService } from './marathon.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Marathon.name, schema: MarathonSchema },
    ]),
    AuthModule,
    TaskModule,
    UserModule,
  ],
  controllers: [MarathonController],
  providers: [MarathonService],
  exports: [MarathonService],
})
export class MarathonModule {}
