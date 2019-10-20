import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';


@Module({
    imports: [EventModule],
    controllers: [AppController, EventController],
    providers: [AppService, EventService],
})
export class EventModule {}