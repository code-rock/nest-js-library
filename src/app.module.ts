import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksControllerController } from './books-controller/books-controller.controller';
import { BooksServiceService } from './books-service/books-service.service';

@Module({
  imports: [],
  controllers: [AppController, BooksControllerController],
  providers: [AppService, BooksServiceService],
})
export class AppModule {}
