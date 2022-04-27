import * as request from 'supertest';
import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { BookModule } from "../src/books/book.module";
import { BooksService } from "../src/books/books.service";

describe('BookController (e2e)', () => {
    let app: INestApplication;

    const book = {
        id: '11',
        title: 'Дети кукурузы',
        authors: 'string',
        description: 'string;',
        favorite: 'string;',
        fileCover: 'string;',
        fileName: 'string;',
        fileBook: 'string;',
        reviews: []
    };

    let mockBooksService = {
        getBooks: jest.fn().mockResolvedValue([book]),
        delete: jest.fn(() => undefined),
        update: jest.fn((id, book) => undefined),
        getBook: jest.fn().mockResolvedValue(book),
        create: jest.fn().mockResolvedValue(book),
    };

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [BookModule],
        }).overrideProvider(BooksService)
            .useValue(mockBooksService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    })

    it('should be defined', () => {
        expect(mockBooksService).toBeDefined()
    })

    it('post create', () => {
        return request(app.getHttpServer())
            .post('/create')
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(book)
            })
    })

    it('get :id', () => {
        return request(app.getHttpServer())
            .get('/11')
            .expect(200)
            .expect(book) 
    })

    it('/books (get)', () => {
        return request(app.getHttpServer())
            .get('/books')
            .expect(200)
            .expect([book])
    })

    it('put :id', () => {
        return request(app.getHttpServer())
            .put('/11')
            .expect(201)
            .then(response => {
                expect(response.body).toEqual(book)
            })
    })

    it('delete /delete/:id', () => {
        return request(app.getHttpServer())
            .delete('/delete/11')
            .expect(200)
            .expect(undefined) 
    })

    afterAll(async () => {
        await app.close();
    })
})
