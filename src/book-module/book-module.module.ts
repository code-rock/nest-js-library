import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksControllerController } from './books-controller.controller';
import { BooksServiceService } from './books-service.service';
import { BookSchema, Book, BookDocument } from './book.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
    controllers: [BooksControllerController],
    providers: [BooksServiceService],
})
export class BookModuleModule {}
