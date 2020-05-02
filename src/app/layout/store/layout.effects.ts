import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, map } from 'rxjs/operators';
import * as LayoutActions from './layout.action';
import { LayoutActionTypes } from './layout.action';
import { LayoutQueue } from '../layout.model';


@Injectable()
export class LayoutEffects {

    constructor(private action$: Actions,
        private httpClient: HttpClient,
        private store: Store<any>
    ) { }

    @Effect()
    fetchLayoutQuery = this.action$.pipe(
        ofType(LayoutActionTypes.FetchQuery),
        switchMap((action: LayoutActions.FetchQuery) => {
            const req = new HttpRequest('post', "http://localhost:9091/layout/resend", []);
            return this.httpClient.request(req)
        }),
        mergeMap((res: HttpResponse<any>) => {
            console.log("Response ::::", res.body);
            return [
                new LayoutActions.Success('Resend success')
            ]
        }
        ),
        catchError(err => of(new LayoutActions.Failed('Resend Failed')))
    );

    @Effect()
    replaceFileContent = this.action$.pipe(
        ofType(LayoutActionTypes.ReplaceContent),
        map((action: LayoutActions.ReplaceContent) => action.payload),
        switchMap((layoutQueue: LayoutQueue) => {
            const req = new HttpRequest('post', "http://localhost:9091/layout/replace", layoutQueue);
            return this.httpClient.request(req)
        }),
        mergeMap(res => [
            new LayoutActions.Success('Replace success')
        ]
        ),
        catchError(err => of(new LayoutActions.Failed('Replace Failed')))
    );
}
