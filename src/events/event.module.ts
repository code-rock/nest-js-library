import { Module } from '@nestjs/common';
import { BookCommentsService } from 'src/comment/comment.service';
import { CommentGateway } from './comment.gateway';

@Module({
    providers: [BookCommentsService, CommentGateway]
})

export class EventModel {}