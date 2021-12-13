import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from'@nestjs/common';

@Injectable() 
export class BookAuthorSurnamePipe implements PipeTransform<any, any> {
    transform(value: any, metadata: ArgumentMetadata): any {
        console.log(value, 'value')
        if (typeof value === 'object') {
            if (value.hasOwnProperty("authors")) {
                const fio = value.authors.split(/\.| /);
                return {
                    ...value,
                    authors: fio[0].length > fio[fio.length - 1].length ? fio[0]: fio[fio.length - 1],
                } 
            }
        } else {
            throw new BadRequestException('Author not exist');
        }
    }
}