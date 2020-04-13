import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap } from 'rxjs/operators';
import { Queue } from '../shared/queue.model';
import * as appActions from './app.action';

@Injectable()
export class AppEffects {

    constructor(private action$: Actions,
         private httpClient: HttpClient, 
         private store: Store<{queues : {queues : Queue[]}}>
    ) {}

    @Effect()
    fetchQueue = this.action$  
                    .ofType(appActions.FETCH_QUEUES).pipe(
                        switchMap(
                            (action : appActions.FetchQueues) => {
                                return this.httpClient.get<Queue[]>('http://localhost:9090/queues',
                                {
                                    observe: 'body',
                                    responseType: 'json'
                                })
                            })
                            ,map(
                                (queues) => {
                                    return {
                                        type: appActions.SET_QUEUES,
                                        payload: queues
                                    };
                                }
                            )
                    );
                    
}