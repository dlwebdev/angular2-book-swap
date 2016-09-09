import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-register',
    templateUrl: 'components/register/register.component.html',
    styleUrls: ['components/register/register.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class RegisterComponent implements OnInit {
    user: object = {};
    regStatus: object = {};
    registerFailureMessage: string = '';

    constructor(private usersService: UsersService, private router: Router) {
        this.user = {
            username: '',
            password: ''
        };        
    }

    ngOnInit() {
        console.log("Initializing register component");
    }    
    
    registerUser() {
        this.usersService.registerUser(this.user)
            .subscribe(
              res => {
                this.regStatus = res.registered;
                if(res.registered) {
                    // Successfully registered. Log them in
                    this.loginUser();
                } else {
                    this.registerFailureMessage = "Error registering";
                }
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
    loginUser() {
        this.usersService.loginUser(this.user)
            .subscribe(
              user => {
                this.user = user;
                
                if(!this.user._id) {
                    // show error message, could not log you in.
                    this.loginFailureMessage = "Incorrect Credentials";
                } else {
                    document.location = "/";
                }
              },
              error =>  this.errorMessage = <any>error
            );        
    }     
    
}