import { Action } from '@ngrx/store';
import { Queue } from '../../shared/queue.model';

export enum QueueActionTypes {
    FetchQueues = '[Queue] Fetch Queue',
    SetQueues = '[Queue] Set Queues',
    ResendQueues = '[Queue] Resend Queues',
    DeleteQueues = '[Queue] Delete Queues',
    SetSuccessMessage = '[Queue] Success Message',
    SetErrorMessage = '[Queue] Error Message'
}

export class FetchQueues implements Action {
    readonly type = QueueActionTypes.FetchQueues;
}

export class SetQueues implements Action {
    readonly type: string = QueueActionTypes.SetQueues
    constructor(public payload: Queue[]) { }
}

export class ResendQueues implements Action {
    readonly type: string = QueueActionTypes.ResendQueues
    constructor(public payload: string[]) { }
}

export class DeleteQueues implements Action {
    readonly type: string = QueueActionTypes.DeleteQueues
    constructor(public payload: string[]) { }
}

export class Success implements Action {
    readonly type: string = QueueActionTypes.SetSuccessMessage
    constructor(public payload: string) { }
}

export class Failed implements Action {
    readonly type: string = QueueActionTypes.SetErrorMessage
    constructor(public payload: string) { }
}

export type QueueActions = FetchQueues
                             | SetQueues 
                             | ResendQueues 
                             | DeleteQueues 
                             | Failed 
                             | Success ;