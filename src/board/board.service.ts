import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';
import { ArticleRepository } from './article.repository';

@Injectable()
export class BoardService {
  constructor(private articleRepository: ArticleRepository) {}

  async getArticles() {
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['author', 'title', 'updatedAt'],
    });
  }

  async getArticleById(id: number) {
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['author', 'title', 'content', 'updatedAt'],
    });
  }

  // 일반 리포지토리엔 없는 커스텀 리포지터리에만 있는 함수!
  async getHotArticles() {
    return await this.articleRepository.getArticlesByViewCount();
  }

  createArticle(
    author: string,
    title: string,
    content: string,
    password: number,
    view: number,
  ) {
    this.articleRepository.insert({
      // 일단 author는 test로 고정합니다.
      author,
      title,
      content,
      // password도 일단은 잠시 숫자를 문자열로 바꿉니다. 나중에 암호화된 비밀번호를 저장하도록 하겠습니다.
      password: password.toString(),
      view,
    });
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
    view: number,
  ) {
    await this.checkPassword(id, password);
    this.articleRepository.update(id, { title, content, view });
  }

  async deleteArticle(id: number, password: number) {
    await this.checkPassword(id, password);
    this.articleRepository.softDelete(id); // soft delete를 시켜주는 것이 핵심입니다!
  }

  private async checkPassword(id: number, password: number) {
    // 아래의 코드는 getArticleById와 거의 흡사하지만 password를 추가로 인출하는 것이 차이입니다.
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });
    if (_.isNil(article)) {
      throw new NotFoundException(`Article not found. id: ${id}`);
    }

    if (article.password !== password.toString()) {
      throw new UnauthorizedException(
        `Article password is not correct. id: ${id}`,
      );
    }
  }
}
