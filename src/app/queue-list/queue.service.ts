import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Queue } from '../shared/queue.model';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  public queueChanged = new Subject<Queue[]>();

  constructor() { }

  private queues: Queue[] = [];

  getQueues() {
    return this.queues.slice();
  }

  setQueues(queues: Queue[]): void {
    this.queues = queues;
    this.queueChanged.next(this.queues.slice());
  }

  resend(queues: Queue[]) {

  }

}
