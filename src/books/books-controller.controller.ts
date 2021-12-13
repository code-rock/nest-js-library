import { Body, UsePipes, Param, Controller, Get, Post, Put, Delete, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books-service.service';
import { Book } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { BookAuthorSurnamePipe } from './pipes/book-review-validation.pipe';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('books-controller')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post('create')
    async createBook(@Body(new BookAuthorSurnamePipe()) body: CreateBookDto) {
        console.log(body, 'book');
        return this.booksService.create(body);
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
    async updateBook(@Param('id') id: string, @Body(new ValidationPipe()) book: CreateBookDto): Promise<void> {
        this.booksService.update(id, book);
    }
    @Delete('/delete/:id')
    async deleteBook(@Param() id: string): Promise<void> {
        this.booksService.delete(id);
    }
}
