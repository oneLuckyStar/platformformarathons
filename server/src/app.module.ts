import { Module } from '@nestjs/common';
import { AnswerModule } from './answer/answer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MarathonModule } from './marathon/marathon.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:passdb@cluster0.jxgvi.mongodb.net/marathons?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
    MarathonModule,
    TaskModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
