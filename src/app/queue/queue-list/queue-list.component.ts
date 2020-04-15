import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {select, Store} from '@ngrx/store'; 
import { Observable, Subscription } from 'rxjs';
import { Queue } from '../../shared/queue.model';
import { QueueService } from '../queue.service';
import { take } from 'rxjs/operators';
import * as fromQueue from '../store/queue.reducer'

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  queueForm: FormGroup;
  queueList: string[];
  queue$: Observable<{queues:Queue[]}>;

  constructor(private fb: FormBuilder,
    private queueService: QueueService,
    private store: Store<fromQueue.QueueState>) {
      this.queueForm = this.fb.group({
        queueArray: this.fb.array([])
      });
     }

  ngOnInit(): void {
    this.queue$ = this.store.pipe(select('queues'));
    this.subscription = this.queue$.pipe(take(1))
                            .subscribe(res => {
                                                this.queueForm = new FormGroup({
                                                  queueArray: new FormControl()
                                              })
                                            });
  }
  
  initForm(queues: Queue[]) {

    const control = <FormArray>this.queueForm.controls['queueArray'];
    queues.forEach(
      (queue) => control.push(this.fb.group({
        name : queue.name,
        count : queue.count,
        selected: queue.selected
      }))
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSubmit() {
    this.queueList = [];
    this.queueForm.value.queueArray
      .filter(queue => queue.selected)
      .forEach(queue => this.queueList.push(queue.name));
    this.queueService.resend(this.queueList)
  }

}