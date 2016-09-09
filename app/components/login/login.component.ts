import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-login',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class LoginComponent {
    user: object = {};
    loginFailureMessage: string = '';
    
    constructor(private usersService: UsersService, private router: Router) {
        this.user = {
            username: '',
            password: ''
        };         
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
                    // send to my-books
                    //this.router.navigate(['/my-books']);
                    document.location = "/";
                }
              },
              error =>  this.errorMessage = <any>error
            );        
    }    
}