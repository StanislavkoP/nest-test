import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsDateStringCustom } from './sd';

export class registrationAtEventDto {
    step: string;

    @IsNotEmpty({
        message: 'Please, fill it'
    })
    firstName: string;

    @IsNotEmpty({
        message: 'Please, fill it'
    })
    lastName: string;

    @IsEmail({},{
        message: 'Please, fill correct email'
    })
    email: string;

    @IsDateStringCustom({
        message: 'Date invalid'
    })
    timeArrival: string;
}

