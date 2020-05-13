import { Action } from '@ngrx/store';
import { FakturaRequest } from '../faktura-request.model';
import { Shipment } from '../shipment-response.model';

export enum InformActionTypes {
    FetchShipmentDetails = '[Inform] Fetch Query',
    Success = '[Inform] Success',
    Failed = '[Inform] Failed',
    SetShipmentDetail = '[Inform Response] Set Shipment Detail'
}

export class FetchShipmentAction implements Action {
    readonly type = InformActionTypes.FetchShipmentDetails;
    constructor(public payload: FakturaRequest) { }
}
export class SuccessAction implements Action {
    readonly type = InformActionTypes.Success;
    constructor(public payload: string) { }
}
export class FailedAction implements Action {
    readonly type = InformActionTypes.Failed;
    constructor(public payload: string) { }
}
export class SetShipmentDetail implements Action {
    readonly type = InformActionTypes.SetShipmentDetail;
    constructor(public payload: Shipment) { }
}

export type InformCustomerActions = FetchShipmentAction | SuccessAction | FailedAction | SetShipmentDetail;
