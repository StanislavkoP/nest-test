import { Injectable } from '@nestjs/common';
import { NewPersonRegistration } from './intefaces/newPerson.interface';

@Injectable()
export class EventService {
    private readonly _registeredPersons: NewPersonRegistration[] = [];

    registerNewPerson(person: NewPersonRegistration) {
        this._registeredPersons.push(person);

        return this.registeredPersons;
    }

    get registeredPersons() {
        return this._registeredPersons
    }
}
