import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { parse, isDate } from 'date-fns';

@ValidatorConstraint({ async: true })
class IsDateStringCustomConstraint implements ValidatorConstraintInterface {
    validate(date: any, args: ValidationArguments) {
        const parsedDate = parse(date, 'dd.MM.yyyy', new Date());
        console.log(isDate(parsedDate))
        if (parsedDate && isDate(parsedDate)) {
            return true;
        } else {
            return false
        }
        
    }
}

export function IsDateStringCustom(validationOptions?: ValidationOptions) {
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