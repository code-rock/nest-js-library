import { 
    ArgumentsHost, 
    ExceptionFilter, 
    HttpException,
    Catch
} from "@nestjs/common";
import { Request, Response } from'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = exception.getStatus();
        const { data, status }: any = exception.getResponse();

        response
            .status(statusCode)
            .json({ 
                timestamp: new Date().toISOString(),
                status: status,
                data: data,
                code: statusCode || 500,
            })
    }
}