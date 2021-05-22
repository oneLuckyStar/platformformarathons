import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { User } from './user.schema';
import { UserRole } from './user.interface';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Post()
  // create(@Body() user: User): Observable<User | Object> {
  //   return this.userService.create(user).pipe(
  //     map((user: User) => user),
  //     catchError((err) => of({ error: err.message })),
  //   );
  // }

  @Post('login')
  async login(@Body() user: User): Promise<Object> {
    return {
      accessToken: await this.userService.login(user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req): User {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params): Promise<User> {
    return this.userService.findOne(params.id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: User['_id']): Promise<any> {
    return this.userService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateOne(@Body() user: User, @Request() req): Promise<Object> {
    return {
      accessToken: await this.userService.updateOne(req.user._id, user),
    };
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateRoleOfUser(
    @Param('id') id: User['_id'],
    @Body() user: User,
  ): Promise<User> {
    return this.userService.updateRoleOfUser(id, user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(@UploadedFile() file, @Request() req): Promise<Object> {
  //   const user: User = req.user;
  //
  //   return this.userService.updateOne(user._id, {
  //     profileImage: file.filename,
  //   });
  // }

  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Promise<Object> {
    return res.sendFile(
      join(process.cwd(), 'uploads/profileimages/' + imagename),
    );
  }
}
