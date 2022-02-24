import { CreateBookReviewDto } from './create-book-review.dto';

export class CreateBookDto {
    readonly title: string;
    readonly authors: string;
    readonly description: string;
    readonly favorite?: string;
    readonly fileCover?: string;
    readonly fileName?: string;
    readonly fileBook?: string;
    readonly reviews?: CreateBookReviewDto[];
}