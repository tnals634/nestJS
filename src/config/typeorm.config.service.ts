import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Article } from 'src/board/article.entity';
import { User } from 'src/user/user.entity';

@Injectable() // 이 키워드 빼놓고 작업하다 DI 안된다고 에러떠서 멘붕 터질 수 있음
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'), // 중요: board 데이터베이스는 미리 생성해놓아야 합니다!
      entities: [Article, User],
      synchronize: true, // Production 환경에서는 false로 설정해야 합니다.
    };
  }
}
