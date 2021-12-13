import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from'@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        console.log(value, metatype,  'metatype')
        if (!metatype || !this.toValidate(metatype)) {
            return value;   
        }
        return value; 
    }
    private toValidate(metatype: Function): boolean {
        const types: Function[] = [CreateBookDto];
        return !types.includes(metatype); 
    }
}