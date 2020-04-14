import { Action } from '@ngrx/store';
import { Queue } from '../../shared/queue.model';

export const FETCH_QUEUES = 'FETCH_QUEUES';
export const SET_QUEUES = 'SET_QUEUES';

export class FetchQueues implements Action {
    readonly type: string = FETCH_QUEUES
    payload:any
}

export class SetQueues implements Action {
    readonly type: string = SET_QUEUES
    payload:Queue[]
}


export type QueueActions = FetchQueues | SetQueues;