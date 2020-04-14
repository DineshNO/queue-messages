import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private dataService : DataService) { }

  resend(queues: string[]) {
      this.dataService.resendQueues(queues)
          .subscribe(response => console.log(response));
  }

}
