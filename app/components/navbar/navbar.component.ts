import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { UsersService } from "../services/users.service";

@Component({
  selector: 'my-navbar',
  templateUrl: 'components/navbar/navbar.component.html',
  styleUrls: ['components/navbar/navbar.component.css'],  
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
    user: any = '';
    userLoggedIn: boolean = false;
    errorMessage: string;

    constructor(private usersService: UsersService, private router: Router) {
      console.log("NAVBAR IS BEING RETRIGGERED!");
    }	
    
    ngOnInit() {
        this.checkIfLoggedIn();
    }     
    
    checkIfLoggedIn() {
      // If the user is logged in it will return the user object, otherwise will redirect to login
      this.usersService.getCurrentUser()
            .subscribe(
                user => {
                    console.log('Current User response: ', user);
                    this.user = user;
                    
                    if(this.user._id) {
                      this.userLoggedIn = true;
                    }
                    else {
                      console.log("NOT LOGGED IN??");
                    }
                },
                error =>  this.errorMessage = <any>error
            );      
    }  
    
    setLoggedInStatus() {
        console.log("Get logged in status so we know whether or not to show My Books section, etc.");
    } 

}