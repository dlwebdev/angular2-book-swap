import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-login',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class LoginComponent implements OnInit {
    user: object = {};
    loginFailureMessage: string = '';
    
    constructor(private usersService: UsersService, private router: Router) {
        this.user = {
            username: '',
            password: ''
        };         
    }

    ngOnInit() {
        console.log("Initializing login component");
    }    
    
    loginUser() {
        console.log("Logging in user: ", this.user);
        
        this.usersService.loginUser(this.user)
            .subscribe(
              user => {
                console.log("Value returned from login post: ", user);
                this.user = user;
                
                if(!this.user._id) {
                    // show error message, could not log you in.
                    this.loginFailureMessage = "Incorrect Credentials";
                } else {
                    // send to my-books
                    this.router.navigate(['/my-books']);
                }
              },
              error =>  this.errorMessage = <any>error
            );        
    }    
}