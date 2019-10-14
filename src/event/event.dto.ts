import { IsNotEmpty, IsEmail } from 'class-validator';

export class registrationAtEventDto {

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

    @IsNotEmpty()
    step: string;

} 