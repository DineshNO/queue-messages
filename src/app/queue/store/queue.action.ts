import { Action } from '@ngrx/store';
import { Queue } from '../../shared/queue.model';

export enum QueueActionEnum{
FETCH_QUEUES = 'FETCH_QUEUES',
SET_QUEUES = 'SET_QUEUES',
SELECT_QUEUE = 'SELECT_QUEUE',
RESEND_QUEUES = 'RESEND_QUEUES',
DELETE_QUEUES = 'DELETE_QUEUES'
}
export const FETCH_QUEUES = 'FETCH_QUEUES';
export const SET_QUEUES = 'SET_QUEUES';
export const SELECT_QUEUE = 'SELECT_QUEUE';
export const RESEND_QUEUES = 'RESEND_QUEUES';
export const DELETE_QUEUES = 'DELETE_QUEUES';
export const RESEND_SUCCESS = 'RESEND_SUCCESS';
export const RESEND_FAILED = 'RESEND_FAILED';

export class FetchQueues implements Action {
    readonly type: string = FETCH_QUEUES
    payload : any
    constructor() { }
}

export class SetQueues implements Action {
    readonly type: string = SET_QUEUES
    constructor(public payload: Queue[]) { }

}

export class SelectQueue implements Action {
    readonly type: string = SELECT_QUEUE;
    constructor(public payload: { index: number}) { }
}

export class ResendQueues implements Action {
    readonly type: string = RESEND_QUEUES
    constructor(public payload: string[]) { }
}

export class DeleteQueues implements Action {
    readonly type: string = DELETE_QUEUES
    constructor(public payload: string[]) { }
}

export class ResendSuccess implements Action {
    readonly type: string = RESEND_SUCCESS
    payload : any
    constructor() { }
}

export class ResendFailed implements Action {
    readonly type: string = RESEND_FAILED
    payload : any
    constructor() { }
}

export type QueueActions = FetchQueues | SetQueues | ResendQueues | SelectQueue | DeleteQueues | ResendFailed | ResendSuccess;