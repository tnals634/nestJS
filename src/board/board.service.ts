import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async getArticles() {
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['id', 'author', 'title', 'createdAt'],
    });
  }

  async getArticleById(id: number) {
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['author', 'title', 'content', 'createdAt', 'updatedAt'],
    });
  }

  createArticle(
    author: string,
    title: string,
    content: string,
    password: number,
  ) {
    this.articleRepository.insert({
      author,
      title,
      content,
      password: password.toString(),
    });
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
  ) {
    await this.checkPassword(id, password);
    this.articleRepository.update(id, { title, content });
  }

  async deleteArticle(id: number, password: number) {
    await this.checkPassword(id, password);

    this.articleRepository.softDelete(id);
  }

  private async checkPassword(id: number, password: number) {
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });
    if (_.isNil(article)) {
      throw new NotFoundException(`Article not found. id: ${id}`);
    }
    if (article.password !== password.toString()) {
      throw new UnauthorizedException(
        `Article password is not corrent. id: ${id}`,
      );
    }
  }
}
