import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import { Validators } from '@angular/forms';
import {Currency, ICurrency} from './currency';
import {Plan} from './plan';
import {User} from './user';
import {CurrencyService} from './currencies.service';
import {PlanService} from './plans.service';
import {UserService} from './users.service';

@Component({
    templateUrl: 'add-plan.component.html',
    selector: 'add-plan',
    providers: [CurrencyService, PlanService, UserService]
})
export class AddPlanComponent implements OnInit {
    form: any;
    title: string;
    plan = new Plan();
    currencies: ICurrency[];
    error: any;
    isSameCurrency: boolean;
    userId: string;
    user: User;
    
    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _currencyService: CurrencyService, private _planService: PlanService, private _userService: UserService) 
    {
        this.isSameCurrency = true;
        this.plan.currIn = new Currency();
        this.plan.currOut = new Currency();
        this.user = new User();
    }

    ngOnInit() {
        this._activatedRoute.params.forEach((params: Params) => {
            if (params['userId'] !== undefined) {
                this.userId = params['userId'];
                console.log(this.userId);
            }
        });
        
        if (!this.userId) {
            return;
        }
        this._userService.getUser(this.userId)
            .then(user => 
            {
                this.user = user;
                this.title = "Add Plan" + " to user " + this.user.name;
            }   )
            .catch(error => this.error = error);
        this._currencyService.getCurrencies()
            .then(currencies => this.currencies = currencies)
            .catch(error => this.error = error);
             
        this.plan.userId = this.userId;   
        
    }

    selectedCurrInChanged(curr1:string, curr2:string) {
        var index = this.currencies.findIndex(x => x.code == curr1);
        this.plan.currIn = this.currencies[index];
        this.selectedChanged(curr1, curr2);        
    }

    selectedCurrOutChanged(curr1:string, curr2:string) {
        var index = this.currencies.findIndex(x => x.code == curr1);
        this.plan.currOut = this.currencies[index];
        this.selectedChanged(curr1, curr2);       
    }

    private selectedChanged(curr1:string, curr2:string) {
        this.isSameCurrency = curr1 === curr2;        
    }


    save() {        
        this._planService.addPlan(this.plan)
            .then(x => {
                this._router.navigate(['/users', this.userId]);
            });        
    }
}