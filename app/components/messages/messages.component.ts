import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MessagesService } from "../services/messages.service";
import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-messages',
    templateUrl: 'components/messages/messages.component.html',
    styleUrls: ['components/messages/messages.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class MessagesComponent implements OnInit {
    user: object = {};
    messagesFromUser: any = [];
    messagesToUser: any = [];
    isLoggedIn: boolean = false;

    constructor(private messagesService: MessagesService, private usersService: UsersService, private router: Router) { }
    
    ngOnInit() {
        this.checkIfLoggedIn();
    } 
    
    checkIfLoggedIn() {
      // If the user is logged in it will return the user object, otherwise will redirect to login
      this.usersService.getCurrentUser()
            .subscribe(
                user => {
                    this.user = user;
                    
                    if(this.user._id) {
                      this.getMessagesFromUser();
                      this.getMessagesToUser();
                    }
                    else {
                      this.router.navigate(['/login']);
                    }                    
                },
                error =>  this.errorMessage = <any>error
            );      
    }   
    
    getMessagesFromUser() {
        this.messagesService.getMessagesFromUser(this.user._id)
            .subscribe(
              messages => {
                this.messagesFromUser = messages;
              },
              error =>  this.errorMessage = <any>error
            );         
    }
    
    getMessagesToUser() {
        this.messagesService.getMessagesToUser(this.user._id)
            .subscribe(
              messages => {
                this.messagesToUser = messages;
              },
              error =>  this.errorMessage = <any>error
            );         
    }
}