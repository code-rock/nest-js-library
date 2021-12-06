import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { BooksServiceService } from 'src/book-module/books-service.service';
import { Book } from './book.schema';

@Controller('books-controller')
export class BooksControllerController {
    constructor(private booksService: BooksServiceService) {}
    @Post()
    async createBook(@Body() book: Book): Promise<void> {
        this.booksService.create(book)
    }
    @Post()
    async getBook(@Body() id: string) {
        return this.booksService.findById(id);
    }
    @Get()
    async getBooks(): Promise<Book[]> {
        return this.booksService.findAll()
    }
    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: Book): Promise<void> {
        this.booksService.update(id, book);
    }
    @Delete('/delete/:id')
    async deleteBook(@Param() id: string): Promise<void> {
        this.booksService.delete(id);
    }
}
