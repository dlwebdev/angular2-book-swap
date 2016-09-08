import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { UsersService } from "../services/users.service";
import { BooksService } from "../services/books.service";

@Component({
    selector: 'my-my-books',
    templateUrl: 'components/my-books/my-books.component.html',
    styleUrls: ['components/my-books/my-books.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class MyBooksComponent implements OnInit {
    searchTitle: string = '';
    searchResults: any = [];
    
    usersCurrentBooks: any = [];
    
    booksYouRequested: any = [];
    booksRequestedFromOthers: any = [];
    
    constructor(private booksService: BooksService, private usersService: UsersService, private router: Router) { }

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
                      this.getUsersBooks();
                    }
                    else {
                      this.router.navigate(['/login']);
                    }
                },
                error =>  this.errorMessage = <any>error
            );      
    }   
    
    searchForBook() {
        this.booksService.searchForBooks(this.searchTitle)
            .subscribe(
              books => {
                this.searchResults = books;
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
    getUsersBooks() {
        this.booksService.getUsersBooks(this.user._id)
            .subscribe(
              books => {
                this.usersCurrentBooks = books;
              },
              error =>  this.errorMessage = <any>error
            );          
    }
    
    addBookToCollection(book:object) {

        let bookToAdd = {
            userId: this.user._id,
            thumbnail: book.thumbnail,
            name: book.title,
            isCheckedOut: false
        };    
        
        this.booksService.addBookToUsersCollection(bookToAdd)
            .subscribe(
              res => {
                this.usersCurrentBooks.push(res);
                this.searchResults = [];
                this.searchTitle = '';
              },
              error =>  this.errorMessage = <any>error
            );         
    }
    
    deleteBook(book:object) {
        this.booksService.deleteBook(book._id)
            .subscribe(
              res => {
                // success
              },
              error =>  this.errorMessage = <any>error
            );         
            
        this.usersCurrentBooks = [];
        this.getUsersBooks();
    }
}