import { PickType } from '@nestjs/mapped-types';
import { signupUserDto } from './signup-user.dto';

export class LoginUserDto extends PickType(signupUserDto, [
  'userId',
  'password',
] as const) {}
