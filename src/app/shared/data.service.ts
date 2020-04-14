import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Queue } from './queue.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public queueChanged = new Subject<Queue[]>();

  constructor(private httpClient: HttpClient) { }

  uri: string = 'http://localhost:9090/'

  getErrorQueueList() {
    return this.httpClient.get<Queue[]>(this.uri + 'queues');
  }

  resendQueues(selectedQueues: string[]) {
    return this.httpClient.post(this.uri+'resend',selectedQueues);
  }

}