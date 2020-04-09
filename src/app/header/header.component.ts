import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { QueueService } from '../queue-list/queue.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private queueService : QueueService) { }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dataService.getErrorQueueList()
        .subscribe(queues => this.queueService.setQueues(queues));
  }
  onFetchQueues() {
    this.router.navigate(['queues'], { relativeTo: this.route });
  }

}
