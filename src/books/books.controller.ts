import { Body, UsePipes, Param, Controller, Get, Post, Put, Delete, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookAuthorSurnamePipe } from './pipes/book-review-validation.pipe';
import { ValidationPipe } from './pipes/validation.pipe';
import { Book, BookSchema, BookDocument } from './schemas/book.schema';

@Controller('books-controller')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post('create')
    async createBook(@Body(new BookAuthorSurnamePipe()) book: Book) {
        return this.booksService.create(book);
    }
    @Get(':id')
    async getBook(@Param('id') id: string) {
        return this.booksService.findById(id);
    }
    @Get('books')
    async getBooks(): Promise<Book[]> {
        return this.booksService.findAll()
    }
    @Put(':id')
    async updateBook(@Param('id') id: string, @Body(new ValidationPipe()) book: Book): Promise<void> {
        this.booksService.update(id, book);
    }
    @Delete('/delete/:id')
    async deleteBook(@Param() id: string): Promise<void> {
        this.booksService.delete(id);
    }
}
