import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromInform from '../store/inform.reducer';
import { Shipment } from '../shipment-response.model';

@Component({
  selector: 'app-inform-response',
  templateUrl: './inform-response.component.html',
  styleUrls: ['./inform-response.component.css']
})
export class InformResponseComponent implements OnInit {

  success$ : Observable<string>;
  error$: Observable<string>;
  shipment$: Observable<Shipment>;

  constructor(private store : Store<fromInform.InformState>) { }

  ngOnInit(): void {
    this.success$ = this.store.pipe(select(fromInform.getSuccessMessage))
    this.error$ = this.store.pipe(select(fromInform.getFailedMessage))
    this.shipment$ = this.store.pipe(select(fromInform.getShipmentDetail))
  }
}
