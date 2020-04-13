import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QueueService } from '../queue-list/queue.service';
import * as appActions from '../store/app.action';
import { Queue } from '../shared/queue.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private queueService: QueueService,
    private store: Store<{ queues: { queues: Queue[] } }>) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.store.dispatch(new appActions.FetchQueues())
  }

}
