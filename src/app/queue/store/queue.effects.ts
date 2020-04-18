import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { Queue } from '../../shared/queue.model';
import * as queueActions from './queue.action';
import { Observable, observable, of } from 'rxjs';

@Injectable()
export class QueueEffects {

    constructor(private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<{ queues: { queues: Queue[] } }>
    ) { }

    @Effect()
    fetchQueue = this.action$.pipe(
        ofType(queueActions.FETCH_QUEUES),
        switchMap((action: queueActions.FetchQueues) => this.httpClient.get<Queue[]>('http://localhost:9090/queues'))
        , map(queues => new queueActions.SetQueues(queues))
    );

    @Effect()
    resendQueues = this.action$.pipe(
        ofType(queueActions.RESEND_QUEUES),
        map((action: queueActions.ResendQueues) => action.payload),
        concatMap(selectedQueues => {
            const req = new HttpRequest('post', "http://localhost:9090/resend", selectedQueues);
            return this.httpClient.request(req)
        }),
        map(res => new queueActions.ResendSuccess()),
        catchError( err => of(new queueActions.ResendFailed())
    ));

    @Effect({ dispatch: false })
    deleteQueues = this.action$.ofType(queueActions.DELETE_QUEUES)
        .pipe(
            switchMap(
                (action: queueActions.DeleteQueues) => {
                    const req = new HttpRequest('post', "http://localhost:9090/delete", action.payload);
                    return this.httpClient.request(req);
                }
            ),
            map(
                res => console.log("Response", res)
            )
        )
}