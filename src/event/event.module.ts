import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { LoggerMiddleware } from './event.middleware';


@Module({
    imports: [EventModule],
    controllers: [AppController, EventController],
    providers: [AppService, EventService],
})
export class EventModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('event')
    }
}
