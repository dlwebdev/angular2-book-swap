import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-login',
    templateUrl: 'components/account/account.component.html',
    styleUrls: ['components/account/account.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class AccountComponent {
    user: object = {};
    userLoggedIn: boolean = false;
    loginFailureMessage: string = '';
    updateMessage: string = '';
    
    constructor(private usersService: UsersService, private router: Router) {
        this.user = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            city: '',
            state: ''
        };         
    }
    
    ngOnInit() {
      this.checkIfLoggedIn();
    }     
    
    checkIfLoggedIn() {
      // If the user is logged in it will return the user object, otherwise will redirect to login
      this.usersService.getCurrentUser()
            .subscribe(
                user => {
                    //console.log('Current User response: ', user);
                    this.user = user;
                    
                    if(this.user._id) {
                      this.userLoggedIn = true;
                    }
                    else {
                      this.router.navigate(['/login']);
                    }                    
                },
                error =>  this.errorMessage = <any>error
            );      
    }     
    
    updateAccount() {
        this.usersService.updateUser(this.user)
            .subscribe(
              user => {
                this.user = user;
                this.updateMessage = "Your account was successfully updated.";
              },
              error =>  this.errorMessage = <any>error
            );        
    }    
}