import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MessagesService } from "../services/messages.service";
import { UsersService } from "../services/users.service";
import { BooksService } from "../services/books.service";

@Component({
    selector: 'my-trades',
    templateUrl: 'components/trades/trades.component.html',
    styleUrls: ['components/trades/trades.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class TradesComponent implements OnInit {
    user: object = {};
    isLoggedIn: boolean = false;
    
    currentTradeDetails: object = {};
    youRequestedCurrentTrade: boolean = false;
    otherRequestedCurrentTrade: boolean = false;

    tradeDetailsClicked: boolean = false;

    tradesYouRequested: any = [];
    yourTradeDetails: any = [];
    
    tradesRequestedFromOthers: any = [];
    othersTradeDetails: any = [];
    
    currentMessage: object = {};

    constructor(private booksService: BooksService, private messagesService: MessagesService, private usersService: UsersService, private router: Router) {
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
                      this.getTradesYouRequested();
                      this.getTradesRequestedFromOthers();
                    }
                    else {
                      this.router.navigate(['/login']);
                    }                    
                },
                error =>  this.errorMessage = <any>error
            );      
    }   
    
    loadRequestDetails(trade:object, tradeType:string) {
      console.log("Trade: ", trade);
      console.log("Trade Type: ", tradeType);
      
      if(tradeType === 'receiving') {
        // you are requesting someone else's book
        this.otherRequestedCurrentTrade = false;
        this.youRequestedCurrentTrade = true;
        
        this.currentMessage.toUser = trade.book.userId;
        
        this.currentMessage.title = "Trade for your book: " + trade.book.name;
        this.currentMessage.message = "I'm interested in making a trade for: " + trade.book.name + ". Please let me know if you'd be interested in any of my books.";
      }
      else {
        // someone is requesting a book you 
        this.youRequestedCurrentTrade = false;
        this.otherRequestedCurrentTrade = true;
        
        this.currentMessage.toUser = trade.trade.userIdRequesting;
        
        this.currentMessage.title = "Regarding your request for: " + trade.book.name;
        this.currentMessage.message = "I understand that you want to trade for " + trade.book.name + ". I will take a look at your collection and offer a trade.";        
      }
      
      this.currentTradeDetails = trade;
      this.tradeDetailsClicked = true;
    }
    
    sendMessage() {
      // The from user id will always be the user logged in
      this.currentMessage.fromUser = this.user._id;
      
      console.log("Will send this message: ", this.currentMessage);
      
      // Use messageService to create a new message from this.
    }
    
    getTradesYouRequested() {
        this.booksService.getRequestsFromUser(this.user._id)
            .subscribe(
              trades => {
                this.tradesYouRequested = trades;
                this.getBooksYouRequested();
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
    getBooksYouRequested() {
        let trades = this.tradesYouRequested;
        
        for( let i = 0; i < trades.length; i++ ) {
          let curTrade = trades[i];
          
          this.booksService.getBook(curTrade.bookId)
              .subscribe(
                book => {
                  this.yourTradeDetails.push({
                    'trade': curTrade,
                    'book': book
                  });
                },
                error =>  this.errorMessage = <any>error
              );           
        }
    }
   
    getTradesRequestedFromOthers() {
        this.booksService.getRequestsFromOthers(this.user._id)
            .subscribe(
              trades => {
                this.tradesRequestedFromOthers = trades;
                this.getBooksRequestedFromOthers();
              },
              error =>  this.errorMessage = <any>error
            );          
    }    
    
    getBooksRequestedFromOthers() {
        let trades = this.tradesRequestedFromOthers;
        
        for( let i = 0; i < trades.length; i++ ) {
          let curTrade = trades[i];
          
          this.booksService.getBook(curTrade.bookId)
              .subscribe(
                book => {
                  this.othersTradeDetails.push({
                    trade: curTrade,
                    book: book
                  });                  
                },
                error =>  this.errorMessage = <any>error
              );           
        } 
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