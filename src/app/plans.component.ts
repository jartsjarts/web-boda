//Angular references
import {Component, OnInit} from '@angular/core';

//Components Reference
import {UsersComponent} from './users.component';
import {User} from './user';
import {Plan} from './plan';

// Services Reference
import {UserService} from './users.service';
import {PlanService} from './plans.service';

@Component({
    selector: 'plans',
    template: `
    <div class="container container-default">
        <h1>Defined swapp plans for user</h1>

        <div class="row">
            <div class="col-md-6">
                <select class="form-control" (change)="reloadPlan({userId: u.value})" #u>
                    <option value="">select user..</option>
                    <option *ngFor="let user of users" value={{user.id}}> 
                        {{user.name}} 
                    </option>
                </select>

                <spinner [visible]="plansLoading"></spinner>
                <ul class="list-group">
                    <li class="list-group-item" [class.active]="currentPlan == plan" 
                        *ngFor="let plan of plans" (click)="select(plan)">{{ plan.id }}</li>
                </ul>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">My plans </h3>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th nowrap>I will be at</th>
                                <th nowrap>From</th>
                                <th nowrap>To</th>
                                <th nowrap>I need</th>
                                <th nowrap>I have</th>
                                <th nowrap>Search</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let plan of plans">
                                <td nowrap>{{ plan.location.name }}</td>
                                <td nowrap>{{ plan.from | date:"dd/MM/yyyy HH:mm"}}</td>
                                <td nowrap>{{ plan.to | date:"dd/MM/yyyy HH:mm"}}</td>
                                <td nowrap>{{ plan.currOut.symbol }}</td>
                                <td nowrap>{{ plan.amount | number:'1.2-2'}} {{ plan.currIn.symbol }}</td>

                                <td>
                                    <a (click)="findMatches(plan)"><i class="glyphicon glyphicon-edit"></i> </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> 

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">My matches </h3>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th nowrap>User</th>
                                <th nowrap>She will be at</th>
                                <th nowrap>From</th>
                                <th nowrap>To</th>
                                <th nowrap>She needs</th>
                                <th nowrap>She has</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let match of matches">
                                <td nowrap>{{ match.userReference.name }}</td>
                                <td nowrap>{{ match.location.name }}</td>
                                <td nowrap>{{ match.from | date:"dd/MM/yyyy HH:mm"}}</td>
                                <td nowrap>{{ match.to | date:"dd/MM/yyyy HH:mm"}}</td>
                                <td nowrap>{{ match.currOut.symbol }}</td>
                                <td nowrap>{{ match.amount | number:'1.2-2'}} {{ match.currIn.symbol }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>           
            </div>

        </div>
    </div>
    `,
    styles: [`
        .plans li { cursor: default; }
        .plans li:hover { background: #ecf0f1; } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
    `],
    providers: [PlanService, UserService]
})

export class PlansComponent implements OnInit {

    plans: Plan[] = [];
    matches: Plan[] = [];
    users: User[] = [];
    plansLoading = true;
    isLoadingComments = true;
    currentPlan: Plan;
    comments: any;

    constructor(private _planServices: PlanService, private _userService: UserService) { }

    ngOnInit() {
        this.loadPlans();
        this.loadUsers();
    }

    private loadUsers() {
        this._userService.getUsers()
            .then(users => this.users = users);
    }
    private loadPlans(filter?: any) {
        this._planServices.getPlans(filter)
            .then(
            plans => {
                this.plans = plans;
                this.plansLoading = false;
            });
    }

    private findMatches(plan: Plan)
    {
         this.plansLoading = true;
        this._planServices.getPlans(null) // Load all plans, filter later UGLY AS HELL
            .then(
            matches => {
                this.matches = matches.filter((candidate) => plan.isMatch(candidate));
                this.matches.forEach(p => {
                    p.userReference = this.users.find(u => u.id == p.userId);
                });
                this.plansLoading = false;
            });
    }

    reloadPlan(userId: string) {
        this.plansLoading = true;
        this.currentPlan = null;
        this.loadPlans(userId);
    }

    select(plan: Plan) {
        this.currentPlan = plan;
        this.isLoadingComments = true;
/*
        this._planServices.getComments(plan.id)
            .then(
            comments => {
                this.comments = comments;
                this.isLoadingComments = false;
            });
*/
    }
}