import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap } from 'rxjs/operators';
import { Queue } from '../../shared/queue.model';
import * as queueActions from './queue.action';

@Injectable()
export class QueueEffects {

    constructor(private action$: Actions,
         private httpClient: HttpClient, 
         private store: Store<{queues : {queues : Queue[]}}>
    ) {}

    @Effect()
    fetchQueue = this.action$  
                    .ofType(queueActions.FETCH_QUEUES).pipe(
                        switchMap(
                            (action : queueActions.FetchQueues) => {
                                return this.httpClient.get<Queue[]>('http://localhost:9090/queues',
                                {
                                    observe: 'body',
                                    responseType: 'json'
                                })
                            })
                            ,map(
                                (queues) => {
                                    return {
                                        type: queueActions.SET_QUEUES,
                                        payload: queues
                                    };
                                }
                            )
                    );
                    
}