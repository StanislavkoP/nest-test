import { Controller, Post, Body, Get, Res, HttpStatus, UsePipes, SetMetadata, UseGuards, UseInterceptors, Render, Req, Param, Query, ValidationPipe } from '@nestjs/common';
import { registrationAtEventDto } from './event.dto';
import { EventService } from './event.service';
import { Response } from 'express';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('/registration')
    @Render('index')
    async registerNewPerson(@Body() newPersonRegistration: registrationAtEventDto, @Res() res: Response) {
        const errors = await this.eventService.validateStep(newPersonRegistration);
        const {
            step,

        } = newPersonRegistration;

        if (Object.keys(errors).length > 0) {
            return {
                registrationStep: parseInt(step),
                userFilledData : {
                    ...newPersonRegistration
                },
                errors
            }
        }

        this.eventService.registeringNewPerson(newPersonRegistration);
        this.eventService.step = parseInt(step);
        
        const userFilledData = this.eventService.registeringPersonData;
        const registrationStep = this.eventService.step;

        if (registrationStep) {
            this.eventService.saveRegisretingPerson(userFilledData);
        }

        return {
            registrationStep: registrationStep + 1,
            userFilledData,
        };
    }

    @Get('registration')
    @Render('index')
    getEventList(@Query('step') reqStep ) {
        let registrationStep = this.eventService.step;
        const userFilledData = this.eventService.registeringPersonData;

        if (reqStep) {
            registrationStep = parseInt(reqStep);
        }

        return {
            registrationStep,
            userFilledData,
        };
    }
    

    @Get('/person/registered')
    async getRegisteredListPerson(@Res() res: Response) {
        const participens = await this.eventService.getAllParticipants();
        res.status(HttpStatus.OK).json(participens)
    }
}
