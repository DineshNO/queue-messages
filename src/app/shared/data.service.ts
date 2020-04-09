import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Queue } from './queue.model';
import { QueueService } from '../queue-list/queue.service'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public queueChanged = new Subject<Queue[]>();

  constructor(private httpClient: HttpClient,
    private queueService: QueueService) { }

  uri: string = 'http://localhost:8080/'

  getErrorQueueList() {
    return this.httpClient.get<Queue[]>(this.uri + 'queues');
  }

  resendQueues() {
    // this.httpClient.post(this.uri+'resend')
  }

}
