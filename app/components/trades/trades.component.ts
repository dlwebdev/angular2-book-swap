import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MessagesService } from "../services/messages.service";
import { UsersService } from "../services/users.service";
import { BooksService } from "../services/books.service";
import { TradesService } from "../services/trades.service";

@Component({
    selector: 'my-trades',
    templateUrl: 'components/trades/trades.component.html',
    styleUrls: ['components/trades/trades.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class TradesComponent implements OnInit {
    user: object = {};
    isLoggedIn: boolean = false;
    tradeToRequest: boolean = false;
    tradeHasCounterTrade: boolean = false;
    actionResultText: string = '';
    
    bookToAcceptTrade: object = {};
    counterTradeBook: object = {};
    
    currentTradeDetails: object = {};
    youRequestedCurrentTrade: boolean = false;
    otherRequestedCurrentTrade: boolean = false;

    tradeDetailsClicked: boolean = false;

    usersBooks: any = [];

    tradesYouRequested: any = [];
    yourTradeDetails: any = [];
    
    tradesRequestedFromOthers: any = [];
    othersTradeDetails: any = [];
    
    currentMessage: object = {};

    constructor(
      private tradesService: TradesService, 
      private booksService: BooksService, 
      private messagesService: MessagesService, 
      private usersService: UsersService, 
      private router: Router
    ) {
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
      
      this.currentTradeDetails = trade;
      this.tradeDetailsClicked = true;      
      
      if(tradeType === 'receiving') {
        // you are requesting someone else's book
        this.otherRequestedCurrentTrade = false;
        this.youRequestedCurrentTrade = true;
        
        this.currentMessage.toUser = trade.book.userId;
        
        this.currentMessage.title = "Trade for your book: " + trade.book.name;
        this.currentMessage.message = "I'm interested in making a trade for: " + trade.book.name + ". Please let me know if you'd be interested in any of my books.";
        
        if(this.currentTradeDetails.trade.counterOfferBookId) {
          
          this.booksService.getBook(this.currentTradeDetails.trade.counterOfferBookId)
                .subscribe(
                  book => {
                    this.counterTradeBook = book;
                  },
                  error =>  this.errorMessage = <any>error
                );          
                
          this.tradeHasCounterTrade = true;
          
          // SHOW THE book the user wants from you in return. Accept or Decline Trade
        }
      }
      else {
        // someone is requesting a book you own
        this.youRequestedCurrentTrade = false;
        this.otherRequestedCurrentTrade = true;
        this.tradeHasCounterTrade = false;
        
        this.currentMessage.toUser = trade.trade.userIdRequesting;
        
        this.currentMessage.title = "Regarding your request for: " + trade.book.name;
        this.currentMessage.message = "I understand that you want to trade for " + trade.book.name + ". I will take a look at your collection and offer a trade."; 
        
        console.log("this.currentTradeDetails.trade: ", this.currentTradeDetails.trade);
        
        this.loadUsersBooks(this.currentTradeDetails.trade.userIdRequesting);
      }
    }
    
    proposeBookTrade(book:object) {
      this.tradeToRequest = true;
      this.bookToAcceptTrade = book;
    }
    
    acceptTrade() {
      // You have accepted the offer to trade the book they've requested in return for this book
      this.currentMessage.message = "I will accept your trade request for my book: " + this.currentTradeDetails.book.name + 
        " in return for your book titled: " + this.bookToAcceptTrade.name + ". Let's set up an exchange.";
      
      this.tradeToRequest = false;
      this.tradeDetailsClicked = false;
      
      // update trade request and set counterOfferBookId to this.bookToAcceptTrade._id
      let updatedTrade = this.currentTradeDetails.trade;
      updatedTrade.counterOfferBookId = this.bookToAcceptTrade._id;
      
      this.tradesService.updateTrade(updatedTrade)
            .subscribe(
              res => {
                //this.getTradesRequestedFromOthers();
              },
              error =>  this.errorMessage = <any>error
            );   
            
      this.sendMessage();
    }
    
    finalizeTrade() {
      // this.counterTradeBook - Book you are getting
      // this.currentTradeDetails.book -- Book you are giving away
      
      this.tradeToRequest = false;
      this.tradeDetailsClicked = false;      
      
      // Remove both books from the system after sending message. They can repost them on their own accounts if they wish to trade them in the future
      
      this.tradesService.deleteTrade(this.currentTradeDetails.trade._id)
            .subscribe(
              trade => {
                console.log("Removed trade: ", trade);
              },
              error =>  this.errorMessage = <any>error
            );       
            
      this.deleteBook(this.counterTradeBook);
      this.deleteBook(this.currentTradeDetails.book);
      
      this.getTradesYouRequested(this.counterTradeBook);
      
      this.currentMessage.message = "I have finalized this request. I will be sending you: " + this.currentTradeDetails.book.name + 
        " in return for your book titled: " + this.counterTradeBook.name + ". Let's set up the exchange.";
        
      this.sendMessage();
      this.router.navigate(['/my-books']);
    }
    
    deleteBook(book:object) {
        this.booksService.deleteBook(book._id)
            .subscribe(
              res => {
                // success
              },
              error =>  this.errorMessage = <any>error
            );         
    }    
    
    deleteTrade() {
      // Delete the trade and send the user a message that the trade was declined.
      this.tradesService.deleteTrade(this.currentTradeDetails.trade._id)
            .subscribe(
              trade => {
                console.log("Removed trade: ", trade);
              },
              error =>  this.errorMessage = <any>error
            );       
      
      this.getTradesRequestedFromOthers();
      
      this.currentMessage.message = "Thanks for your trade request, but I'm not interested in that book at the moment.";
      this.sendMessage();
    }
    
    loadUsersBooks(userIdRequestingTrade:string) {
      // Load the users books that you can choose from
      this.booksService.getUsersBooks(userIdRequestingTrade)
            .subscribe(
              books => {
                this.usersBooks = books;
              },
              error =>  this.errorMessage = <any>error
            );       
    }
    
    sendMessage() {
      // The from user id will always be the user logged in
      this.currentMessage.fromUser = this.user._id;
      
      console.log("Will send this message: ", this.currentMessage);
      
      // Use messageService to create a new message from this.
      this.messagesService.sendMessage(this.currentMessage)
            .subscribe(
              message => {
                this.actionResultText = "Your message has been sent";
              },
              error =>  this.errorMessage = <any>error
            );        
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
        this.yourTradeDetails = [];
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
        this.othersTradeDetails = [];
        
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