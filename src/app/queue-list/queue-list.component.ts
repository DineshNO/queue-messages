import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Queue } from '../shared/queue.model';
import { QueueService } from './queue.service';

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
    private queueService: QueueService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.queueService
      .queueChanged
      .subscribe((queues: Queue[]) => this.queues = queues);
    this.queues = this.queueService.getQueues();
    this.initForm();
  }

  onSubmit() {
    console.log("Values", this.queueForm.value.queueArray);
    this.queueList = [];
    this.queueForm.value.queueArray
      .filter(queue => queue.selected)
      .forEach(queue => this.queueList.push(queue.name));
  }

  initForm() {
    this.queueForm = this.fb.group({
      queueArray: this.fb.array([])
    });
    this.initQueues();
  }
  initQueues() {
    const control = <FormArray>this.queueForm.controls['queueArray'];
    this.queues.forEach(x => {
      control.push(this.initQ(x));
    });
  }

  initQ(queue: Queue): FormGroup {
    return this.fb.group({
      name: queue.name,
      count: queue.count,
      selected: queue.selected
    });
  }

  onRefresh(){}
}

