import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Queue } from '../../shared/queue.model';
import { QueueService } from '../queue.service';
import * as fromQueue from '../store/queue.reducer';
import * as queueActions from '../store/queue.action'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  queueForm: FormGroup;
  queueList: string[];
  queues: Queue[];

  constructor(private fb: FormBuilder,
    private queueService: QueueService,
    private store: Store<fromQueue.QueueState>) {
    this.queueForm = this.fb.group({
      queueArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.subscription = this.store.pipe(select('queues'))
      .subscribe(res => {
        if (res) {
          this.queues = res['queues'];
          this.initForm();
        }
      });
  }

  initForm(queues?: Queue[]) {
    const control = <FormArray>this.queueForm.controls['queueArray'];
    this.queues.forEach(
      (queue) => control.push(this.fb.group({
        name: queue.name,
        count: queue.count,
        selected: queue.selected
      }))
    )
    this.subscription.unsubscribe();
  }

  onClick(index: number, event: any) {
    console.log(index,event)
    this.store.dispatch(new queueActions.SelectQueue({ index: index }))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.queueForm.reset();
  }

  onSubmit() {
    this.queueList = [];
    this.queueForm.value.queueArray
      .filter(queue => queue.selected)
      .forEach(queue => this.queueList.push(queue.name));
    console.log("List of selected :::",this.queueList)
    this.store.dispatch(new queueActions.ResendQueues(this.queueList))
  }

  onDelete(){
    this.queueList = [];
    this.queueForm.value.queueArray
      .filter(queue => queue.selected)
      .forEach(queue => this.queueList.push(queue.name));
    console.log("List of selected :::",this.queueList)
    this.store.dispatch(new queueActions.DeleteQueues(this.queueList))
  }

}