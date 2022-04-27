import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentsService } from './comment.service';
import { BookCommentSchema } from './schemas/comment.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: BookCommentSchema }])],
    controllers: [BookCommentsService],
    providers: [BookCommentsService],
})
export class BookCommentModel {}
