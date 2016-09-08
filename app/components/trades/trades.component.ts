import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MessagesService } from "../services/messages.service";
import { UsersService } from "../services/users.service";
import { BooksService } from "../services/books.service";

@Component({
    selector: 'my-messages',
    templateUrl: 'components/messages/messages.component.html',
    styleUrls: ['components/messages/messages.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class TradesComponent implements OnInit {
    user: object = {};
    isLoggedIn: boolean = false;

    booksYouRequested: any = [];
    booksRequestedFromOthers: any = [];

    constructor(private booksService: BooksService, private messagesService: MessagesService, private usersService: UsersService, private router: Router) { }
    
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
                      this.getBooksYouRequested();
                      this.getBooksRequestedFromOthers();
                    }
                    else {
                      this.router.navigate(['/login']);
                    }                    
                },
                error =>  this.errorMessage = <any>error
            );      
    }   
    
    getBooksYouRequested() {
        this.booksService.getRequestsFromUser(this.user._id)
            .subscribe(
              books => {
                this.booksYouRequested = books;
              },
              error =>  this.errorMessage = <any>error
            );          
    }
    
    getBooksRequestedFromOthers() {
        this.booksService.getRequestsFromOthers(this.user._id)
            .subscribe(
              books => {
                this.booksRequestedFromOthers = books;
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