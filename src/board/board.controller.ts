import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';
import { DeleteArticleDto } from './delete-article.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('board') //routing path is /board -> e.g. http://localhost:3000/board
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //게시글 목록을 가져오는 api
  @SkipThrottle() // 데코레이터 추가!
  @Get('/articles')
  async getArticles() {
    return await this.boardService.getArticles();
  }

  //게시글 상세 보기
  @Throttle(5, 60) // 이렇게 하면 60초에 5번 호출만 가능!
  @Get('/articles/:id')
  async getArticleById(@Param('id') articleId: number) {
    //여기서 받는 값을 number로 작성했지만 실제 파라미터는 string으로 나온다.
    // 그래서 여기서 다운받은 class-transformer 가 필요한 이유다. -> main으로 가서 작업해준다.
    return await this.boardService.getArticleById(articleId);
  }
  // 새롭게 추가한 API
  @Get('/hot-articles')
  async getHotArticles() {
    return await this.boardService.getHotArticles();
  }

  //게시글 작성
  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    return this.boardService.createArticle(
      data.author,
      data.title,
      data.content,
      data.password,
      data.view,
    );
  }

  //게시글 수정
  @Put('/articles/:id')
  async updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  ) {
    return await this.boardService.updateArticle(
      articleId,
      data.title,
      data.content,
      data.password,
      data.view,
    );
  }

  //게시글 삭제
  @Delete('/articles/:id')
  async deleteArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
  ) {
    return await this.boardService.deleteArticle(articleId, data.password);
  }
}
