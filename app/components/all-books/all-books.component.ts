import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { BooksService } from "../services/books.service";
import { UsersService } from "../services/users.service";

@Component({
    selector: 'my-all-books',
    templateUrl: 'components/all-books/all-books.component.html',
    styleUrls: ['components/all-books/all-books.component.css'],
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class AllBooksComponent implements OnInit {
    user: object = {};
    allBooks: any = [];
    isLoggedIn: boolean = false;

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
        console.log("User with id of " + this.user._id + " is requesting this book: ", book);
         
        this.booksService.requestBook(book, this.user._id)
            .subscribe(
              res => {
                console.log("Result from book being requested: ", res);
                this.router.navigate(['/my-books']);
              },
              error =>  this.errorMessage = <any>error
            );         
    }    

}