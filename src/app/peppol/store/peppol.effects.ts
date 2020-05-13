import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { PeppolQueueTypes, PeppolQueueActions } from './peppol.action';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import * as PeppolActions from './peppol.action';
import { of } from 'rxjs';


@Injectable()
export class PeppolEffects {
    constructor(private httpClient: HttpClient, private actions$: Actions) { }

    @Effect()
    resendPeppol = this.actions$.pipe(
        ofType(PeppolQueueTypes.ResendQueue),
        map((action: PeppolQueueActions) => action.payload),
        switchMap((ids) => {
            const req = new HttpRequest('post', "http://localhost:9091/peppol/resend", [ids]);
            return this.httpClient.request(req)
        }),
        mergeMap((res: HttpResponse<any>) => {
            console.log("Response ::::", res.body);
            return [
                new PeppolActions.PeppolSuccess('Resend success')
            ]
        }
        ),
        catchError(err => of(new PeppolActions.PeppolFailed('Resend Failed')))

    )

}