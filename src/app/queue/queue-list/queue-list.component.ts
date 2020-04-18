import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Queue } from '../../shared/queue.model';
import * as queueActions from '../store/queue.action';
import * as fromQueue from '../store/queue.reducer';

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
  successMessage$: Observable<string>;
  errorMessage$: Observable<string>;

  constructor(private fb: FormBuilder,
    private store: Store<fromQueue.State>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.pipe(select(fromQueue.getQueueList))
                            .subscribe(queues => {
                              if (queues) {
                                this.queues = queues;
                                this.initForm();
                              }
                            });
     this.successMessage$ = this.store.pipe(select(fromQueue.getSuccessMessage)) 
     this.errorMessage$ = this.store.pipe(select(fromQueue.getError)) 
  }

  initForm() {
    this.queueForm = this.fb.group({
      queueArray: this.fb.array([])
    });
    const control = <FormArray>this.queueForm.controls['queueArray'];
    this.queues.forEach(
      (queue) => control.push(this.fb.group({
        name: queue.name,
        count: queue.count,
        selected: queue.selected
      }))
    );
  }

  onClick(index: number, event: any) {
    console.log(index, event);
    this.store.dispatch(new queueActions.SelectQueue({ index: index }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.queueForm.reset();
  }

  onSubmit() {
    this.filterQuery()
    this.store.dispatch(new queueActions.ResendQueues(this.queueList)); 
    //this.clear()   
  }

  delete() {
    this.filterQuery()
    this.store.dispatch(new queueActions.DeleteQueues(this.queueList));
    //this.clear()   
  }

  filterQuery(){
    this.queueList = [];
    this.queueForm.value.queueArray
      .filter(queue => queue.selected)
      .forEach(queue => this.queueList.push(queue.name));
  }

  clear() {
    this.queueForm.reset()
  }

}
