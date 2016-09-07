import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-messages',
    templateUrl: 'components/messages/messages.component.html',
    styleUrls: ['components/messages/messages.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class MessagesComponent implements OnInit {

    constructor(private router: Router) { }
    
    ngOnInit() {
        console.log("Initializing messages component");
    }    
}