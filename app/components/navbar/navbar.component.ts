import { Component, OnInit, ngAfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

//import { AuthService } from "../services/auth.service";

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

    constructor() { }	

    ngOnInit() {
        //this.setLoggedInStatus();
    }
    
    setLoggedInStatus() {
        console.log("Get logged in status so we know whether or not to show My Books section, etc.");
    } 

}