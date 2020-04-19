import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take, takeLast, tap, filter, concatMap } from 'rxjs/operators';
import { Queue } from '../../shared/queue.model';
import { QueueActionTypes } from './queue.action';
import * as QueueActions from './queue.action'

@Injectable()
export class QueueEffects {

    constructor(private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<{ queues: { queues: Queue[] } }>
    ) { }

    @Effect()
    fetchQueue = this.action$.pipe(
        ofType(QueueActionTypes.FetchQueues),
        switchMap((action: QueueActions.FetchQueues) => this.httpClient.get<Queue[]>('http://localhost:9090/queues').pipe(take(1)))
        , map(queues => new QueueActions.SetQueues(queues))
    );

    @Effect()
    resendQueues = this.action$.pipe(
                                        ofType(QueueActionTypes.ResendQueues),
                                        map((action: QueueActions.ResendQueues) => action.payload),
                                        switchMap(selectedQueues => {
                                            const req = new HttpRequest('post', "http://localhost:9090/resend", selectedQueues);
                                            return this.httpClient.request(req).pipe(
                                                filter(data => Boolean(data)),
                                                tap(data => console.log("Data emitted ::::::::",data)),
                                                takeLast(1)
                                                )
                                        }),
                                        mergeMap(res => [
                                            new QueueActions.FetchQueues(),
                                            new QueueActions.Success('Resend success')
                                        ]),
                                        catchError(err => of(new QueueActions.Failed('Resend Failed')))
                                   );

    @Effect()
    deleteQueues = this.action$.pipe(
                                ofType(QueueActionTypes.DeleteQueues),
                                map((action: QueueActions.DeleteQueues) => action.payload),
                                switchMap(selectedQueues => {
                                    const req = new HttpRequest('post', "http://localhost:9090/delete", selectedQueues);
                                    return this.httpClient.request(req).pipe(takeLast(1))
                                }),
                                mergeMap(res => [
                                    new QueueActions.FetchQueues(),
                                    new QueueActions.Success('Resend success')
                                ]),
                                catchError(err => of(new QueueActions.Failed('Delete failed')))
                            );
}