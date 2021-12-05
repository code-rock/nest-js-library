import { Injectable } from '@nestjs/common';
import { Book } from '../book.interface';

@Injectable()
export class BooksServiceService {
    private readonly books: Book[] = []

    create(book: Book): number {
        return this.books.push(book);
    }
    findAll(): Book[] {
        return this.books;
    }
    findById(id: string): Book {
        return this.books.find(book => book.id === id);
    }
    findIndex(id: string): number {
        return this.books.findIndex((book) => book.id === id);
    }
    update(book: Book): void {
        const index = this.findIndex(book.id);
        if (index !== -1) {
            this.books[index] = book;
        }
    }
    delete(id: string): void {
        const index = this.findIndex(id);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }
}
