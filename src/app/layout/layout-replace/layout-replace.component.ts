import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as layoutActions from '../store/layout.action'

@Component({
  selector: 'app-layout-replace',
  templateUrl: './layout-replace.component.html',
  styleUrls: ['./layout-replace.component.css']
})
export class LayoutReplaceComponent implements OnInit,OnDestroy {

  layoutForm: FormGroup = this.fb.group({
    'fromContent': this.fb.control('', Validators.required),
    'toContent': this.fb.control('', Validators.required),
    'listOfIds': this.fb.control('', Validators.required)
  });

  constructor(private fb: FormBuilder,
    private store: Store<any>) { }

  ngOnInit(): void {
    this.layoutForm = this.fb.group({
      'fromContent': this.fb.control('', Validators.required),
      'toContent': this.fb.control('', Validators.required),
      'listOfIds': this.fb.control('', Validators.required)
    });
  }

  ngOnDestroy(){
    this.layoutForm.reset();
  }

  onSubmit() {
    this.store.dispatch(new layoutActions.ReplaceContent(this.layoutForm.value))
  }


}
