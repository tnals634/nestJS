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

@Controller('board') //routing path is /board -> e.g. http://localhost:3000/board
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //게시글 목록을 가져오는 api
  @Get('/articles')
  getArticles() {
    return this.boardService.getArticles();
  }

  //게시글 상세 보기
  @Get('/articles/:id')
  getArticleById(@Param('id') articleId: number) {
    //여기서 받는 값을 number로 작성했지만 실제 파라미터는 string으로 나온다.
    // 그래서 여기서 다운받은 class-transformer 가 필요한 이유다. -> main으로 가서 작업해준다.
    return this.boardService.getArticleById(articleId);
  }

  //게시글 작성
  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    return this.boardService.createArticle(
      data.title,
      data.content,
      data.password,
    );
  }

  //게시글 수정
  @Put('/articles/:id')
  updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  ) {
    return this.boardService.updateArticle(
      articleId,
      data.title,
      data.content,
      data.password,
    );
  }

  //게시글 삭제
  @Delete('/articles/:id')
  deleteArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
  ) {
    return this.boardService.deleteArticle(articleId, data.password);
  }
}
