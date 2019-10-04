import { Catch, HttpException, ExceptionFilter, ArgumentsHost, ForbiddenException } from "@nestjs/common";

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception.getStatus();


        
        if (request.route.path === '/admin/login') {
            response
  .status(status)
  .send('Hello');
        } else {
            response.redirect('/admin/login')
        }
        

        // if (exception instanceof )
    }
}