import { Module } from '@nestjs/common';
import { BooksController } from './realtime.controller';
import { BooksService } from './books.service';

@Module({
    controllers: [BooksController],
    providers: [BooksService],
})
export class BookModuleModule {}
