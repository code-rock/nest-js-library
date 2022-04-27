import { Param, Controller, Get, Post, Put, Delete,  } from '@nestjs/common';
import { BookCommentsService } from './comment.service';
import { BookCommentDto } from './dto/comment.dto';

@Controller('books-controller')
export class BookCommentsModel {
    constructor(private bookCommentsService: BookCommentsService) {}

    @Post('create')
    async createcomment(comment: BookCommentDto) {
        return this.bookCommentsService.create(comment);
    }
    @Get(':id')
    async getComment(@Param('id') id: number) {
        return this.bookCommentsService.findById(id);
    }
    @Get('comments')
    async getComments(id): Promise<BookCommentDto[]> {
        return this.bookCommentsService.findAllBookComment(id)
    }
    @Put(':id')
    async updateComment(@Param('id') id: number, comment: BookCommentDto): Promise<void> {
        this.bookCommentsService.update(id, comment);
    }
    @Delete('/delete/:id')
    async deleteComment(@Param() id: number): Promise<void> {
        this.bookCommentsService.delete(id);
    }
}
