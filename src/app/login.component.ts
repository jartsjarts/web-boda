import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {UserService} from './users.service';
import { User } from './user';

@Component({
    selector: 'login',
    template: `
    <div class="container container-default">
        <div class="row">
                <div class="col-lg-12 text-center">
                    <h2>Login</h2>
                    <hr class="star-primary">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
                    <!-- The form should work on most web servers, but if the form is not working you may need to configure your web server differently. -->
                    <form name="sentMessage" id="contactForm" novalidate>
                        <div class="row control-group">
                            <div class="form-group col-xs-12 floating-label-form-group controls">
                                <label>User</label>

                                <select class="form-control" #u placeholder="Name" (change)="selectedUser({userId: u.value})" id="name" required data-validation-required-message="Please enter your name.">
                                    <option value="">select user..</option>
                                    <option *ngFor="let user of users" value={{user.id}}> 
                                        {{user.name}} 
                                    </option>
                                </select>

                                <p class="help-block text-danger"></p>
                            </div>
                        </div>
                        <div class="row control-group">
                            <div class="form-group col-xs-12 floating-label-form-group controls">
                                <label>Password</label>
                                <input type="password" class="form-control" placeholder="Password" id="pass" required data-validation-required-message="Please enter your password.">
                                <p class="help-block text-danger"></p>
                            </div>
                        </div>
                        <br>
                        <div id="success"></div>
                        <div class="row">
                            <div class="form-group col-xs-12 text-center">
                                <button type="submit" (click)="loginUser()" class="btn btn-success btn-lg">Accept</button>
                                <button type="cancel" class="btn btn-success btn-lg" style="margin-left: 20px;">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    `
})

export class LoginComponent implements OnInit {
    users: User[];
    error: any;
    selectedId: number;

    constructor(private _service: UserService, private _router: Router) { }

    ngOnInit() {
        this._service.getUsers()
            .then(users => this.users = users)
            .catch(error => this.error = error);
    }

    public selectedUser(userId: number){
        this.selectedId = userId;
    }

    public loginUser(){
        this._router.navigate(['/users', this.selectedId]);
    }

}