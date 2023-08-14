import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { signupUserDto } from './signup-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { LoginUserDto } from './login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login') // 강의영상엔 @Get으로 되어있는데 @Post가 맞습니다!
  async login(@Body() data: LoginUserDto) {
    return await this.userService.login(data.userId, data.password);
  }

  @Post('/signup')
  async createUser(@Body() data: signupUserDto) {
    return await this.userService.createUser(
      data.userId,
      data.name,
      data.password,
    );
  }

  @Put('/update')
  updateUser(@Body() data: UpdateUserDto) {
    this.userService.updateUser(data.userId, data.name, data.password);
  }
}
