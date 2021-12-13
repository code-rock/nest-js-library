import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, Book } from './book.schema';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
    
    async create(book: Book): Promise<Book> {
        const createdBook = new this.bookModel(book);
        return createdBook.save();
    }
    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }
    async findById(id: string): Promise<Book> {
        return this.bookModel.findById(id);
    }
    async update(id: string, book: Book) {
        return this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
            context: 'query'
        });
    }
    async delete(id: string) {
        return this.bookModel.deleteOne({ _id: id });
    }
}
