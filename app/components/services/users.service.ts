// UsersService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UsersService {
  
  /**
   * Creates a new UsersService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http, private jsonp:Jsonp) {}

  registerUser(user:Object): Observable<string[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    console.log("Service passing along user: ", user);

    return this.http.post('/register', JSON.stringify(user), {
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