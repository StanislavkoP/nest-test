import { IsNotEmpty, IsEmail, ValidateIf } from 'class-validator';
import { IsDateStringCustom } from './validateCustomDecorators';

export class registrationAtEventDto {
    step: string;

    @ValidateIf(p => p.step === "1")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    firstName: string;

    @ValidateIf(p => p.step === "1")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    lastName: string;

    @ValidateIf(p => p.step === "1")
    @IsEmail({},{
        message: 'Please fill correct email'
    })
    email: string;

    @ValidateIf(p => p.step === "2")
    @IsDateStringCustom({
        message: 'Please fill correct email e.g. 31.12.2019'
    })
    timeArrival: string;

    @ValidateIf(p => p.step === "2")
    @IsDateStringCustom({
        message: 'Please fill correct email e.g. 31.12.2019'
    })
    timeDeparture: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    companyName: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    positionCompany: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please choose an option'
    })
    role: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please choose an option'
    })
    sex: string;

    @ValidateIf(p => p.step === "2")
    @IsDateStringCustom({
        message: 'Please fill correct email e.g. 31.12.2019'
    })
    birthdate: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    country: string;
}

export class createAtEventDto {
    @ValidateIf(p => p.step === "1")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    firstName: string;

    @ValidateIf(p => p.step === "1")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    lastName: string;

    @ValidateIf(p => p.step === "1")
    @IsEmail({},{
        message: 'Please fill correct email'
    })
    email: string;

    @ValidateIf(p => p.step === "2")
    @IsDateStringCustom({
        message: 'Please fill correct email e.g. 31.12.2019'
    })
    timeArrival: string;

    @ValidateIf(p => p.step === "2")
    @IsDateStringCustom({
        message: 'Please fill correct email e.g. 31.12.2019'
    })
    timeDeparture: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    companyName: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    positionCompany: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please choose an option'
    })
    role: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please choose an option'
    })
    sex: string;

    @ValidateIf(p => p.step === "2")
    @IsDateStringCustom({
        message: 'Please fill correct email e.g. 31.12.2019'
    })
    birthdate: string;

    @ValidateIf(p => p.step === "2")
    @IsNotEmpty({
        message: 'Please fill it'
    })
    country: string;
}

