import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { Queue } from '../../shared/queue.model';
import * as queueActions from './queue.action';

@Injectable()
export class QueueEffects {

    constructor(private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<{ queues: { queues: Queue[] } }>
    ) { }

    @Effect()
    fetchQueue = this.action$.pipe(
        ofType(queueActions.FETCH_QUEUES),
        switchMap(
            (action: queueActions.FetchQueues) => {
                return this.httpClient.get<Queue[]>('http://localhost:9090/queues',
                    {
                        observe: 'body',
                        responseType: 'json'
                    })
            })
        , map(
            (queues) => {
                return {
                    type: queueActions.SET_QUEUES,
                    payload: queues
                };
            }
        )
    );

    @Effect()
    resendQueues = this.action$.ofType(queueActions.RESEND_QUEUES)
        .pipe(
            switchMap(
                (action: queueActions.ResendQueues) => {
                    const req = new HttpRequest('post', "http://localhost:9090/resend", action.payload);
                    return this.httpClient.request(req);
                }
            ),
            map(
                res => this.store.dispatch(new queueActions.FetchQueues())
            )
        )

    @Effect()
    deleteQueues = this.action$.ofType(queueActions.DELETE_QUEUES)
        .pipe(
            switchMap(
                (action: queueActions.DeleteQueues) => {
                    const req = new HttpRequest('post', "http://localhost:9090/delete", action.payload);
                    return this.httpClient.request(req);
                }
            ),
            map(
                res => this.store.dispatch(new queueActions.FetchQueues())
            )
        )
}