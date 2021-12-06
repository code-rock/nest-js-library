import { BookReview } from "./book-review.interface";

export interface Book {
    id: string;
    title: string;
    authors: string;
    description: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    reviews: BookReview[];
}
