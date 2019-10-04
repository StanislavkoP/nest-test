import { IsString } from 'class-validator';

export class NewPersonRegistration {
    
    @IsString()
    readonly firstName;

    @IsString()
    readonly lastName;

    @IsString()
    readonly email;
}