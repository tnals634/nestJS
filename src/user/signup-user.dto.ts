import { IsString } from 'class-validator';

export class signupUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}
