import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { BooksService } from "../services/books.service";

@Component({
    selector: 'my-my-books',
    templateUrl: 'components/my-books/my-books.component.html',
    styleUrls: ['components/my-books/my-books.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class MyBooksComponent implements OnInit {
    searchTitle: string = '';
    searchResults: any = [];
    
    constructor(private booksService: BooksService) {
        console.log("GETTING USERS!");
    }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {
        console.log("Initializing my books component");
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
    
    addBookToCollection(book:object) {
        console.log("Will add this book to your collection: ", book);
    }
}