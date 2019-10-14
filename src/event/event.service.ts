import { Injectable } from '@nestjs/common';
import { NewPersonRegistration } from './intefaces/newPerson.interface';
import { registrationAtEventDto } from './event.dto';
import { validate } from 'class-validator';

@Injectable()
export class EventService {
    private readonly _registeredPersons: NewPersonRegistration[] = [];
    private _registeringPerson = {
        firstName: '',
        lastName: '',
        email: '',
        timeArrival: '',
        timeDeparture: '',
        companyName: '',
        positionCompany: '',
        role: '',
        sex: '',
        birthdate: '',
        country: ''
    };
    private _completedStep: number = 1;

    registeringNewPerson(person: NewPersonRegistration) {
        this._registeringPerson = {
            ...this._registeringPerson,
            ...person,
        }
    }

    set step (step) {
        this._completedStep = step;
    }

    get step () {
        return this._completedStep;
    }

    get registeringPersonData () {
        return this._registeringPerson
    }

    get stepRegisteringPerson () {
        const dateArrivale = this._registeringPerson.timeArrival;
        const dateDeparture = this._registeringPerson.timeDeparture;
        const companyName = this._registeringPerson.companyName;
        const positionCompany = this._registeringPerson.positionCompany;
        const role = this._registeringPerson.role;
        const sex = this._registeringPerson.sex;
        const birthdate = this._registeringPerson.birthdate;
        const country = this._registeringPerson.country;
        const userName = this._registeringPerson.firstName;
        const userLastName = this._registeringPerson.lastName;
        const userEmail = this._registeringPerson.email;

        if (userName && userLastName && userEmail && dateArrivale && dateDeparture && companyName && positionCompany && role && sex && birthdate && country) {
            return 3
        }

        if (userName && userLastName && userEmail) {
            return 2;
        }

        return 1;
    }

    get registeredPersons() {
        return this._registeredPersons
    }

    async validateStep(payload) {
        let step = new registrationAtEventDto();
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                step[key] = payload[key]
            }
        }
        
        return await validate(step).then((errors) => {
            const errorList = {}

            for (const key in errors) {
                const {
                    property,
                    constraints,

                } = errors[key];

                errorList[property] = {
                    message: Object.entries(constraints)[0][1]
                };
            }

            return errorList
        })
    }
}
