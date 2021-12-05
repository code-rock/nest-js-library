import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksServiceService } from 'src/books-service/books-service.service';
import { Book } from '../book.interface';

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
    @Post()
    async updateBook(@Body() book: Book): Promise<void> {
        this.booksService.update(book);
    }
    @Post()
    async deleteBook(@Body() id: string) {
        this.booksService.delete(id);
    }
}
