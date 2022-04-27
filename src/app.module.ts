import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './books/book.module';
import { EventModel } from './events/event.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hhxrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),
    BookModule,
    EventModel
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
