import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as queueActions from '../../queue/store/queue.action';
import { Queue } from '../../shared/queue.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private store: Store<{ queues: { queues: Queue[] } }>) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
