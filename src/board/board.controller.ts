import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { BoardService } from './board.service';

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
  getArticleById() {
    return this.boardService.getArticleById(id);
  }

  //게시글 작성
  @Post('/articles')
  createArticle() {
    return this.boardService.createArticle();
  }

  //게시글 수정
  @Put('/articles/:id')
  updateArticle() {
    return this.boardService.updateArticle(id);
  }

  //게시글 삭제
  @Delete('/articles/:id')
  deleteArticle() {
    return this.boardService.deleteArticle(id);
  }
}
