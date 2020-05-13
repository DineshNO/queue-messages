import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-peppol',
  templateUrl: './peppol.component.html',
  styleUrls: ['./peppol.component.css']
})
export class PeppolComponent implements OnInit {

  peppolForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.peppolForm = this.fb.group({
      'listOfIds': this.fb.control('', Validators.required)
    });
  }

  onSubmit() {
    console.log("submit :::",this.peppolForm.value)
  }

  resetQueueToFailed(){
    console.log("Reset to failed :::",this.peppolForm.value)
  }

}
