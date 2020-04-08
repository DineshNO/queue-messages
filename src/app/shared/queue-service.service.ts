import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Queue } from './queue.model';

@Injectable({
  providedIn: 'root'
})
export class QueueServiceService {

  constructor( private httpClient: HttpClient) { }

  uri : string = 'http://localhost:9090/'

  getErrorQueueList(){
    return this.httpClient.get<Queue[]>('https://ng-recipe-book-online.firebaseio.com/recipes.json');
  }
}
