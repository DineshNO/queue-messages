import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as queueActions from './store/queue.action';
import { Queue } from '../shared/queue.model';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor(private store: Store<{ queues: { queues: Queue[] } }>) { }

  ngOnInit(): void {
    this.store.dispatch(new queueActions.FetchQueues())
  }

}
