import { PartialType } from '@nestjs/mapped-types';
import { signupUserDto } from './signup-user.dto';

export class UpdateUserDto extends PartialType(signupUserDto) {}
