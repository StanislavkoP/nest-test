import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { DatabaseModule } from '../config/database/database.module';


@Module({
    imports: [TypeOrmModule.forFeature([EventRepository])],
    controllers: [AppController, EventController],
    providers: [EventService],
    exports: [EventService]
})
export class EventModule {}