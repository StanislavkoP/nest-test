import { Catch, HttpException, ExceptionFilter, ArgumentsHost, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from 'express';
@Catch(HttpException)
export class AdminAuthExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.log(request)

        if (
            exception instanceof UnauthorizedException ||
            exception instanceof ForbiddenException
        ) {
            response.redirect('/admin/login');
        }

        return true;
    }
}