import { Module, MiddlewareConsumer, HttpStatus } from '@nestjs/common';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController]
})
export class AdminModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkIsAuth).forRoutes(AdminController);
  // }
}

function checkIsAuth(req, res, next) {
  if (req.user || req.route.path === '/admin/login') {
    next();
  
  } else {
    res.redirect(HttpStatus.MOVED_PERMANENTLY, '/admin/login')
  
  }

};