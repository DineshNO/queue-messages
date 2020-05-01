import { Action } from '@ngrx/store';
import { LayoutQueue } from '../layout.model';

export enum LayoutActionTypes {
    FetchQuery = '[Layout] Fetch Query',
    Success = '[Layout] Success',
    Failed = '[Layout] Failed',
    ReplaceContent = '[Layout Replace] Replace Content'
}

export class FetchQuery implements Action {
    readonly type = LayoutActionTypes.FetchQuery;
}

export class ReplaceContent implements Action {
    readonly type: string = LayoutActionTypes.ReplaceContent
    constructor(public payload: LayoutQueue) { }
}

export class Success implements Action {
    readonly type: string = LayoutActionTypes.Success
    constructor(public payload: String) { }
}

export class Failed implements Action {
    readonly type: string = LayoutActionTypes.Failed
    constructor(public payload: String) { }
}

export type LayoutActions = FetchQuery | ReplaceContent | Success | Failed;