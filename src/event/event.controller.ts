import { Controller, Post, Body, Get, Res, HttpStatus, UsePipes, SetMetadata, UseGuards, UseInterceptors, Render, Req, Param, Query, ValidationPipe } from '@nestjs/common';
import { NewPersonRegistration } from './dto/event.dto';
import { EventService } from './event.service';
import { Response, Request } from 'express';
import { JoiValidationPipe } from './event.validation';
import { Roles, RolesGuard } from '../roles.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor.interceptor';
import { registrationAtEventDto } from './event.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('/registration')
    // @UsePipes(new ValidationPipe({
    //     validationError : {
    //         target: true
    //     }
    // }))
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
    getRegisteredListPerson(@Res() res: Response) {
        res.status(HttpStatus.OK).json([])
    }
}
