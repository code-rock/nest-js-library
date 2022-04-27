import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookCommentDocument } from './schemas/comment.schema';
import { BookCommentDto } from './dto/comment.dto';

@Injectable()
export class BookCommentsService {
    constructor(@InjectModel(Comment.name) private bookCommentModel: Model<BookCommentDocument>) {}
 
    async create(comment: BookCommentDto): Promise<BookCommentDto> {
        const createdBook = new this.bookCommentModel(comment);
        return createdBook.save();
    }

    async findAllBookComment(bookId: number): Promise<BookCommentDto[]> {
        return this.bookCommentModel.find().exec();
    }

    async findById(id: number): Promise<BookCommentDto> {
        return this.bookCommentModel.findById(id);
    }
    
    async update(id: number, comment: BookCommentDto) {
        return this.bookCommentModel.findByIdAndUpdate(id, comment, {
            new: true,
            runValidators: true,
            context: 'query'
        });
    }

    async delete(id: number) {
        return this.bookCommentModel.deleteOne({ _id: id });
    }
}
