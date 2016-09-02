import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';

@Component({
    selector: 'my-my-books',
    templateUrl: 'components/my-books/my-books.component.html',
    styleUrls: ['components/my-books/my-books.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class MyBooksComponent implements OnInit {

    constructor() {
        console.log("GETTING USERS!");
    }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {
        console.log("Initializing my books component");
    }    
}