import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Http } from "@angular/http";
//import './rxjs-operators';

@Component({
    selector: 'my-login',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        console.log("Initializing login component");
    }    
}