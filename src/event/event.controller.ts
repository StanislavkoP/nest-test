import { Controller, Post, Body, Get, Res, HttpStatus, UsePipes, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { NewPersonRegistration } from './dto/event.dto';
import { EventService } from './event.service';
import { Response } from 'express';
import { JoiValidationPipe } from './event.validation';
import { Roles, RolesGuard } from '../roles.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor.interceptor';

@Controller('event')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('/person/registration')
    async registerNewPerson(@Body(new JoiValidationPipe()) newPersonRegistration: NewPersonRegistration): Promise<string> {
        const createdNewPerson = this.eventService.registerNewPerson({
            firstName: newPersonRegistration.firstName,
            lastName: newPersonRegistration.lastName,
            email: newPersonRegistration.email
        });

        return `Our ${JSON.stringify(createdNewPerson)}`;
    }

    @Get('/person/list')
    // @Roles('admin')
    getEventList() {
        return this.eventService.registeredPersons
    }

    @Get('/person/registered')
    getRegisteredListPerson(@Res() res: Response) {
        res.status(HttpStatus.OK).json([])
    }
}
