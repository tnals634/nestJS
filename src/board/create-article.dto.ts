import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly author: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly password: number;
}
