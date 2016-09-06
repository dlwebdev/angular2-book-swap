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
    
    constructor(private booksService: BooksService, private usersService: UsersService, private router: Router) {
        console.log("GETTING USERS!");
    }

    ngOnInit() {
        this.checkIfLoggedIn();
    }    
    
    checkIfLoggedIn() {
      // If the user is logged in it will return the user object, otherwise will redirect to login
      this.usersService.getCurrentUser()
            .subscribe(
                user => {
                    //console.log('Current User response: ', user);
                    this.user = user;
                    
                    if(this.user._id) {
                      console.log("Logged in, show books");
                      this.getUsersBooks();
                    }
                    else {
                      console.log("No User returned.");
                      this.router.navigate(['/login']);
                    }
                },
                error =>  this.errorMessage = <any>error
            );      
    }    
    
    searchForBook() {
        console.log("Searching for: ", this.searchTitle);
        
        this.booksService.searchForBooks(this.searchTitle)
            .subscribe(
              books => {
                console.log("Books: ", books);
                this.searchResults = books;
              },
              error =>  this.errorMessage = <any>error
            );        
    }
    
    getUsersBooks() {
        console.log("Get all of the users current books.");
        
        this.booksService.getUsersBooks(this.user._id)
            .subscribe(
              books => {
                console.log("Users Books: ", books);
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
        
        console.log("Will add this book to your collection: ", bookToAdd);
        
        this.booksService.addBookToUsersCollection(bookToAdd)
            .subscribe(
              res => {
                this.usersCurrentBooks.push(res);
              },
              error =>  this.errorMessage = <any>error
            );         
    }
}