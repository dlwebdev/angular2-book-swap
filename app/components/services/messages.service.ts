// BooksService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MessagesService {
  constructor(private http: Http, private jsonp:Jsonp) {}
  
  getMessagesToUser(userId:string): Observable<Object[]> {
    return this.http.get('/api/messages/to-user/' + userId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }   
  
  getMessagesFromUser(userId:string): Observable<Object[]> {
    return this.http.get('/api/messages/from-user/' + userId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }   
  
  sendMessage(message:Object): Observable<string[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http.post('/api/messages/', JSON.stringify(message), {
      headers: headers
    }).map((res) => res.json());
  }  
  
  deleteMessage(id:string): Observable<string[]> {
    return this.http.delete('/api/messages/' + id)
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