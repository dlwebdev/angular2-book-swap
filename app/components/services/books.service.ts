// BooksService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class BooksService {
  
  /**
   * Creates a new BooksService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http, private jsonp:Jsonp) {}

  getAllBooks(): Observable<Object[]> {
    return this.http.get('/api/books/')
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  } 

  searchForBooks(term:string): Observable<Object[]> {
    return this.http.get('/api/books/search/' + term)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  } 
  
  getUsersBooks(userId:string): Observable<Object[]> {
    return this.http.get('/api/books/user/' + userId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }   

  addBookToUsersCollection(book:Object): Observable<string[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http.post('/api/books/', JSON.stringify(book), {
      headers: headers
    }).map((res) => res.json());
  }   

  /**
    * Handle HTTP error
  */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }  
}