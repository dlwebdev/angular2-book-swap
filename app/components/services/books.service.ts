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

  getBook(bookId:string): Observable<Object[]> {
    return this.http.get('/api/books/' + bookId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }

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
  
  getRequestsFromUser(userId:string): Observable<Object[]> {
    // Get all of the requests this user has made
    return this.http.get('/api/books/user/requests/' + userId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }   
  
  getRequestsFromOthers(userId:string): Observable<Object[]> {
    // Get all requests directed towards this user. So other people requesting books from this user
    return this.http.get('/api/books/requests-for-user/' + userId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }    
  
  requestBook(book:Object, userIdRequesting:string): Observable<string[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http.post('/api/books/request/' + userIdRequesting, JSON.stringify(book), {
      headers: headers
    }).map((res) => res.json());
  }    

  addBookToUsersCollection(book:Object): Observable<string[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http.post('/api/books/', JSON.stringify(book), {
      headers: headers
    }).map((res) => res.json());
  }   
  
  deleteBook(id:string): Observable<string[]> {
    return this.http.delete('/api/books/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
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