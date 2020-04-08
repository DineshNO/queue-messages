import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit {

  public queues: String[] = [
    'nm-ehf',
    'layout-factory-test-cscs',
    'b2b-inbound'
  ];

  queueForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let queueName = '';
    let count = 0;
    let selected = new FormArray([]);
    this.queueForm = new FormGroup({
      'name': new FormControl(queueName, Validators.required),
      'count': new FormControl(count, Validators.required),
      'selected': new FormControl(selected, Validators.required)
    })
  }

  submit(){
    console.log(this.queueForm);
  }
}
