import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, Book } from './book.schema';
import * as admin from 'firebase-admin';

const serviceAccount = require("../../firebase-adminsdk-mtxev.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-23b96-default-rtdb.europe-west1.firebasedatabase.app"
});


// GET	/api/books	получить все книги	получаем массив всех книг
// GET	/api/books/:id	получить книгу по id	получаем объект книги, если запись не найдено вернем Code: 404
// POST	/api/books	создать книгу	создаем кногу и возврашаем ее же вместе с присвоенным id
// PUT	/api/books/:id	редактировать книгу по id	редактируем объект книги, если запись не найдено вернем Code: 404
// DELETE	/api/books/:id	удалить книгу по id	удаляем книгу и возвращаем ответ: 'ok'


@Injectable()
export class BooksService {
    db = admin.database();

    async create(book: Book) {
        return await this.db.ref('books').push(book)
    }
    async findAll(): Promise<Book[]> {
        return (await this.db.ref('books').once('value')).val()
    }
    async findById(id: string): Promise<Book> {
        const info = (await this.db.ref('books').child(id).once('value'))
        return info.val()
    }
    async update(id: string, book: Book) {
        return await this.db.ref('books').child(id).update(book)
    }
    async delete(id: string) {
        return await this.db.ref('books').child(id).remove()
    }
}
