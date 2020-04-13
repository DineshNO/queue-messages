import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Queue } from '../shared/queue.model';
import { QueueService } from './queue.service';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit {
  subscription: Subscription;
  queueForm: FormGroup;
  queueList: string[];
  queues: Queue[];
  queue$: Observable<{ queues: Queue[] }>;
  shoppingListState: Observable<{ queues: Queue[] }>;

  constructor(private fb: FormBuilder,
    private queueService: QueueService,
    private store: Store<{ queues: { queues: Queue[] } }>) { }

  ngOnInit(): void {
    this.queue$ = this.store.select('queues');
    this.queue$.subscribe(res => this.initForm(res.queues))
  }

  onSubmit() {
    this.queueList = [];
    this.queueForm.value.queueArray
      .filter(queue => queue.selected)
      .forEach(queue => this.queueList.push(queue.name));
    this.queueService.resend(this.queueList)
  }

  initForm(queues: Queue[]) {
    this.queueForm = this.fb.group({
      queueArray: this.fb.array([])
    });
    const control = <FormArray>this.queueForm.controls['queueArray'];
    queues.forEach(
      (queue) => control.push(this.fb.group({
        name: queue.name,
        count: queue.count,
        selected: queue.selected
      }))
    )
  }

  onRefresh() { }
}