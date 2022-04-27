import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../books.service';
import { Book } from '../schemas/book.schema';

describe('BooksService', () => {
    let booksService: BooksService;

    const books = [{ title: 'Осень' }, { title: 'Зима' }];
    const id = '8';
    const book = {
        title: 'Дети кукурузы',
        authors: 'string',
        description: 'string;',
        favorite: 'string;',
        fileCover: 'string;',
        fileName: 'string;',
        fileBook: 'string;',
        reviews: []
    };

    const mockBookModel = class {
        book: any;
        constructor(book) {
          this.book = book;
        }
        save = jest.fn().mockImplementation(() => Promise.resolve({ id: Date.now(), ...this.book }))
        static find = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockImplementation(() => books)
        }))
        static findById = jest.fn().mockImplementation((id) => Promise.resolve(book))
        static findByIdAndUpdate = jest.fn().mockImplementation((id, book) => Promise.resolve({
            id,
            book,
            new: true,
            runValidators: true,
            context: 'query'
        }))
        static deleteOne = jest.fn().mockImplementation((id) => Promise.resolve(id))
    }
 
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getModelToken(Book.name),
                    useValue: mockBookModel,
                },
            ],
        }).compile();

        booksService = moduleRef.get<BooksService>(BooksService);
    });

    it('should be defined', () => {
        expect(booksService).toBeDefined()
    })

    it('shoud save book in base and return promise with created book', async () => {
        expect(await booksService.create(book)).toStrictEqual({ id: expect.any(Number), ...book })
    })

    it('shoud return an array of book', async () => {
        expect(await booksService.findAll()).toStrictEqual(books)
    })

    it('shoud find book by id', async () => {
        expect(await booksService.findById(id)).toBe(book)
    })

    it('shoud ubdate book to new version', async () => {
        expect(await booksService.update(id, book)).toStrictEqual({
            id,
            book,
            new: true,
            runValidators: true,
            context: 'query'
        })
    })

    it('shoud delete book from base by id', async () => {
        expect(await booksService.delete(id)).toStrictEqual({ '_id': id })
    })
})

