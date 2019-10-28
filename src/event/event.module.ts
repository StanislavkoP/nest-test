import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';


@Module({
    imports: [TypeOrmModule.forFeature([EventRepository])],
    controllers: [AppController, EventController],
    providers: [AppService, EventService],
    exports: [EventService]
})
export class EventModule {}