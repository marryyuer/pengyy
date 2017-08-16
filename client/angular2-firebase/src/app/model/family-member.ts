import { Place } from './place';

export class FamilyMember {
    name: string;
    age: number;
    birthday: Date;
    location: Place;
    checked: boolean;
    email?: string;
    role?: string;
}
