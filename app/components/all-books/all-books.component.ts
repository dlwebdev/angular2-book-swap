import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

import { BooksService } from "../services/books.service";

@Component({
    selector: 'my-all-books',
    templateUrl: 'components/all-books/all-books.component.html',
    styleUrls: ['components/all-books/all-books.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class AllBooksComponent implements OnInit {

    allBooks: any = [];

    constructor(private booksService: BooksService) { }
    
    ngOnInit() {
        this.getAllBooks();
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
}