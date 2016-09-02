import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

@Component({
    selector: 'my-all-books',
    templateUrl: 'components/all-books/all-books.component.html',
    styleUrls: ['components/all-books/all-books.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class AllBooksComponent implements OnInit {

    constructor() {
        console.log("GETTING USERS!");
    }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {
        console.log("Initializing all books component");
    }    
}