import {
  Injectable,
  CanActivate,
  Inject,
  forwardRef,
  ExecutionContext,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '../../user/user.schema';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const user: User = request.user;
    const dbUser = await this.userService.findOne(user._id);

    if (dbUser._id == params.id && dbUser) return true;

    return false;
  }
}
