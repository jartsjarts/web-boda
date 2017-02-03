import { Currency, ICurrency } from './currency';
import {User} from './user';


export class Location {
    id: string;
    name: string;
    lat: number;
    lon: number;

    isMatch(location: Location): boolean
    {
        return location && location.name == this.name;
    }
}

export class Plan {
    id: string;
    userId: string;
    location: Location;
    from: Date;
    to: Date;
    currIn : ICurrency;
    currOut : ICurrency;
    amount: number;
    proposedMe: boolean;
    proposedOther: boolean;
    accepted : boolean;

    userReference : User;

    isMatch(plan: Plan): boolean
    {
        return plan
        && this.location 
        && this.location.isMatch(plan.location)
        && this.currIn 
        && this.currIn.isMatch(plan.currOut);
        // TODO: compare converted amounts!!
    }
}

export class PlanMatch {
    planIdSrc: string;
    planIdDst: string;
}