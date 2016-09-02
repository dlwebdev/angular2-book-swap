import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-register',
    templateUrl: 'components/register/register.component.html',
    styleUrls: ['components/register/register.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class RegisterComponent implements OnInit {
    user: object = {};

    constructor(private usersService: UsersService) {
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
              user => {
                this.user = user
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
}