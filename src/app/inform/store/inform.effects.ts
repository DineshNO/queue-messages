import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, take } from 'rxjs/operators';
import * as InformActions from '../store/inform.action';
import { InformActionTypes } from './inform.action';
import { Shipment } from '../shipment-response.model';

@Injectable()
export class InformEffects {

    constructor(private action$: Actions, private httpClient: HttpClient) { }

    @Effect()
    informCustomer = this.action$.pipe(
        ofType(InformActionTypes.FetchShipmentDetails),
        switchMap((action: InformActions.FetchShipmentAction) => this.httpClient.get<Shipment>('http://localhost:9090/shipment/json/' + action.payload.id).pipe(take(1))),
        mergeMap((shipment: Shipment) => {
            console.log("shipment", shipment)
            return [
                new InformActions.SetShipmentDetail(shipment),
                new InformActions.SuccessAction('Request success')
            ]
        }
        ),
        catchError(err => {
            console.log("Error", err)
            return of(new InformActions.FailedAction('Request Failed'))
        }
        ));
}