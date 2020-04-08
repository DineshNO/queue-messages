import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QueueServiceService } from '../shared/queue-service.service';
import { Queue } from '../shared/queue.model';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private queueService: QueueServiceService) { }
              
  queueForm: FormGroup;
  queueList : string[];

  public queues: Queue[] = [
    new Queue('nm-ehf', 5, false),
    new Queue('layout-factory-test', 5, false),
    new Queue('b2b-inbound', 9, false)
  ];

  ngOnInit(): void {
    // this.queueService.getErrorQueueList()
    //     .subscribe(queues => this.queues = queues );
    this.initForm()
  }

  onSubmit() {
    console.log("Values",this.queueForm.value.queueArray);
    this.queueList=[];
    this.queueForm.value.queueArray
        .filter(queue => queue.selected)
        .forEach(queue => this.queueList.push(queue.name));
  }

  onRefresh(){
    this.queueService.getErrorQueueList()
        .subscribe(queues => this.queues = queues );
  }

  initForm(){
    this.queueForm = this.fb.group({
      queueArray: this.fb.array([])
    });
    this.initQueues(this.queues);
  }
  initQueues(queues) {
    const control = <FormArray>this.queueForm.controls['queueArray'];
    this.queues.forEach(x => {
      control.push(this.initQ(x));
    });
  }

  initQ(q?: Queue): FormGroup {
  
    return this.fb.group({
      name: q.name,
      count: q.count,
      selected: q.selected
    });
  }
}
