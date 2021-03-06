// TradesService.js
import { Injectable } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TradesService {
  
  /**
   * Creates a new BooksService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
  */  
  constructor(private http: Http, private jsonp:Jsonp) {}

  getAllTrades(): Observable<Object[]> {
    return this.http.get('/api/trades/')
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  } 

  getTrade(tradeId:string): Observable<Object[]> {
    return this.http.get('/api/trades/' + tradeId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }
  
  getUsersTrades(userId:string): Observable<Object[]> {
    return this.http.get('/api/trades/user/' + userId)
                .map((res: Response) => res.json())
                .catch(this.handleError);     
  }   
  
  updateTrade(trade:Object): Observable<string[]> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put('/api/trades/', JSON.stringify(trade), {
      headers: headers
    }).map((res) => res.json());
  }   
  
  deleteTrade(id:string): Observable<string[]> {
    return this.http.delete('/api/trades/' + id)
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