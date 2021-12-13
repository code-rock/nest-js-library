import { Body, Param, Controller, Get, Post, Put, Delete, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books-service.service';
import { Book } from './book.schema';
import { LoggingInterceptor } from '../common/intercepts/logger.interceptor';
import { CreateBookDto } from './dto/create-product.dto';

@Controller('books-controller')
export class BooksController {
    constructor(private booksService: BooksService) {
        console.log('я родился')
    }
    @Post('create')
    async createBook(@Body() body: CreateBookDto) {
        console.log(body, 'book');
        return this.booksService.create(body);
    }
    @Post(':id')
    async getBook(@Param('id') id: string) {
        return this.booksService.findById(id);
    }
    @Get('books')
    async getBooks(): Promise<Book[]> {
        return this.booksService.findAll()
    }
    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: CreateBookDto): Promise<void> {
        this.booksService.update(id, book);
    }
    @Delete('/delete/:id')
    async deleteBook(@Param() id: string): Promise<void> {
        this.booksService.delete(id);
    }
}
