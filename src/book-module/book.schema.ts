import { Prop, Schema, SchemaFactory } from'@nestjs/mongoose';
import { Document } from 'mongoose';
import { BookReview } from './book-review.interface';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop()
    authors: number;

    @Prop()
    description: string;

    @Prop()
    favorite: string;

    @Prop()
    fileCover: number;

    @Prop()
    fileName: string;

    @Prop()
    fileBook: string;

    @Prop()
    reviews: BookReview[];
}

export const BookSchema = SchemaFactory.createForClass(Book);