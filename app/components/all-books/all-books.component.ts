import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { BooksService } from "../services/books.service";
import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-all-books',
    templateUrl: 'components/all-books/all-books.component.html',
    styleUrls: ['components/all-books/all-books.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class AllBooksComponent implements OnInit {

    allBooks: any = [];
    isLoggedIn: boolean = false;

    constructor(private booksService: BooksService, private usersService: UsersService) { }
    
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
                      this.isLoggedIn = true;
                    }
                    
                    this.getAllBooks();
                },
                error =>  this.errorMessage = <any>error
            );      
    }    
    
    getAllBooks() {
        this.booksService.getAllBooks()
            .subscribe(
              books => {
                this.allBooks = books;
              },
              error =>  this.errorMessage = <any>error
            );          
    }  
    
    requestBook(book:object) {
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