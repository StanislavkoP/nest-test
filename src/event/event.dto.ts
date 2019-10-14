import { IsNotEmpty, IsEmail, registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { toDate } from 'date-fns';

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

    @IsDateStringCustom()
    timeArrival: string;
}




@ValidatorConstraint({ async: true })
class IsDateStringCustomConstraint implements ValidatorConstraintInterface {
    validate(date: any, args: ValidationArguments) {
        console.log(date)
        return true
    }
}

function IsDateStringCustom(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsDateStringCustomConstraint,
            constraints: [],
        });
    };
 }