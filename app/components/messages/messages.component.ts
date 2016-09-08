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
    showMessageDetail: boolean = false;
    messageType: string = '';
    messageToShow: object = {};
    currentMessage: object = {};
    actionResultText: string = "";

    constructor(private messagesService: MessagesService, private usersService: UsersService, private router: Router) 
    {
      this.currentMessage = {
        fromUser: '',
        toUser: '',
        title: '',
        message: ''
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
    
    loadMessage(message:object, messageType:string) {
        this.messageType = messageType;
        
        if(messageType == 'sent') {
            // this was a message you sent
        }
        else {
            // this message was received from another user
        }
        
        this.messageToShow = message;
        this.showMessageDetail = true;
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
    
    sendMessage() {
      this.currentMessage.fromUser = this.user._id;
      this.currentMessage.toUser = this.messageToShow.fromUser;
      
      // Use messageService to create a new message from this.
      this.messagesService.sendMessage(this.currentMessage)
            .subscribe(
              message => {
                this.actionResultText = "Your message has been sent";
                this.currentMessage = {};
                this.showMessageDetail = false;
                this.messagesFromUser.push(message);
              },
              error =>  this.errorMessage = <any>error
            );        
    } 
    
    deleteMessage() {
        this.messagesService.deleteMessage(this.messageToShow._id)
            .subscribe(
              message => {
                this.messageToShow = {};
              },
              error =>  this.errorMessage = <any>error
            );         
            
        this.showMessageDetail = false;
        this.getMessagesFromUser();
        this.getMessagesToUser();            
    }
}