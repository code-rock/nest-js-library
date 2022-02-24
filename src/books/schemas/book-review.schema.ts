import { Prop, Schema, SchemaFactory } from'@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = BookReview & Document;

@Schema()
export class BookReview {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    text: string;
}

export const BookReviewSchema = SchemaFactory.createForClass(BookReview);