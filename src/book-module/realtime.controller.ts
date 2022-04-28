import { Body, Param, Controller, Get, Post, Put, Delete, Injectable, ExecutionContext, NestInterceptor, CallHandler, NotFoundException, UseInterceptors, Res, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.schema';
import { NotFoundInterceptor } from './not-found.interceptor';
import { Response } from 'express';

@Controller('api/books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    async getBooks(@Res() res: Response) {
        const books = await this.booksService.findAll()
        res.status(HttpStatus.OK).json(books || []);
    }

    @Get(':id')
    @UseInterceptors(NotFoundInterceptor)
    async getBooksById(@Param('id') id: string, @Res() res: Response) {
        const book = await this.booksService.findById(id);
        res.status(HttpStatus.OK).json(book);
    }

    @Post()
    async createBook(@Body() book: Book, @Res() res: Response) {
        const created = await this.booksService.create(book);
        res.status(HttpStatus.OK).json({ ...book, id: created.key });
    }

    @Put(':id')
    @UseInterceptors(NotFoundInterceptor)
    async updateBook(@Param('id') id: string, @Body() book: Book, @Res() res: Response) {
        const updated = await this.booksService.update(id, book);
        res.status(HttpStatus.OK).json(updated);
    }

    @Delete('/delete/:id')
    async deleteBook(@Param() id: string, @Res() res: Response) {
        await this.booksService.delete(id);
        res.status(HttpStatus.OK).json('ok');
    }
}
