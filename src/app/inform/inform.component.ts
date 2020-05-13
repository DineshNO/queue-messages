import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as informActions from '../inform/store/inform.action';
import { FakturaRequest } from './faktura-request.model';

@Component({
  selector: 'app-inform',
  templateUrl: './inform.component.html',
  styleUrls: ['./inform.component.css']
})
export class InformComponent implements OnInit {

  informCustomerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.informCustomerForm = this.fb.group({
      'fakturaId': this.fb.control(''),
      'reason': this.fb.control('')
    })
  }

  onSubmit() {
    const shipment: FakturaRequest = {
      id: this.informCustomerForm.get('fakturaId').value as string,
      reason: this.informCustomerForm.get('reason').value as string
    }
    this.store.dispatch(new informActions.FetchShipmentAction(shipment))
    this.router.navigate(['details'],{relativeTo:this.route})
  }
}
