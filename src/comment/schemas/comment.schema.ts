import { Prop, Schema, SchemaFactory } from'@nestjs/mongoose';
import { Document } from 'mongoose';
import { BookCommentDto } from '../dto/comment.dto';

export type BookCommentDocument = BookCommentDto & Document;

@Schema()
export class Comment {
    @Prop()
    id: number;
    @Prop()
    bookId: number;
    @Prop()
    comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(Comment);