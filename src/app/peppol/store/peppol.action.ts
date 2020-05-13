import { Action } from '@ngrx/store';

export enum PeppolQueueTypes {
    ResendQueue = '[Peppol] resend queue',
    Success = '[Peppol] success',
    Failed = '[Peppol] failed'
}

export class PeppolResend implements Action {
    readonly type: string
    constructor(public payload: string[]) { }
}

export class PeppolSuccess implements Action {
    readonly type: string
    constructor(public payload: string) { }
}

export class PeppolFailed implements Action {
    readonly type: string
    constructor(public payload: string) { }
}

export type PeppolQueueActions = PeppolResend | PeppolFailed | PeppolSuccess