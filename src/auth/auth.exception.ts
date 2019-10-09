import { Catch, HttpException, ExceptionFilter, ArgumentsHost, ForbiddenException } from "@nestjs/common";

@Catch(HttpException)
export class AuthException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        console.log(status)
        if (status === 401 || 403) response.redirect('/login')

        return true
    }
}