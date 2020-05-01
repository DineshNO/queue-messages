import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Queue } from '../../shared/queue.model';
import * as queueActions from '../store/queue.action';
import * as fromQueue from '../store/queue.reducer';
import { find, filter, map } from 'rxjs/operators';

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
  isEnable: boolean = true;

  constructor(private fb: FormBuilder,
    private store: Store<fromQueue.State>) {
  }

  get aliases(): FormArray {
    return <FormArray>this.queueForm['controls'].queueArray['controls'];
  }

  ngOnInit(): void {
    this.subscription = this.store.pipe(select(fromQueue.getQueueList))
      .subscribe(queues => {
        if (queues) {
          this.queues = queues;
          this.isEnable = true;
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
    const control = <FormArray>this.queueForm.get('queueArray');
    this.queues.forEach(
      (queue) => control.push(this.fb.group({
        name: queue.name,
        count: queue.count,
        selected: queue.selected
      }))
    );

    this.queueForm.get('queueArray')
        .valueChanges
        .subscribe(queues => this.isEnable = !queues.some(q => q.selected))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.queueForm.reset();
  }

  onSubmit() {
    if (confirm('Please confirm to resend')) {
      this.filterQuery()
      this.store.dispatch(new queueActions.ResendQueues(this.queueList));
    }
  }

  delete() {
    this.filterQuery()
    this.store.dispatch(new queueActions.DeleteQueues(this.queueList));
  }

  filterQuery() {
    this.queueList = this.queueForm.value.queueArray
      .filter(queue => queue.selected === true)
      .map(queue => queue.name)
  }

  clear() {
    this.queueForm.reset();
  }

}
