import * as fromRoot from '../../store/app.reducer';
import { InformActionTypes, InformCustomerActions } from './inform.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Shipment } from '../shipment-response.model';

export interface State extends fromRoot.State {
    informCustomer: InformState,
}

export interface InformState {
    successMessage: string,
    errorMessage: string,
    shipment: Shipment
}

const initialState: InformState = {
    successMessage: '',
    errorMessage: '',
    shipment: null
};

const getInformCustomerFeatureState = createFeatureSelector<InformState>('informCustomer');

export const getSuccessMessage = createSelector(
    getInformCustomerFeatureState,
    state => state?.successMessage
)

export const getFailedMessage = createSelector(
    getInformCustomerFeatureState,
    state => state?.errorMessage
)

export const getShipmentDetail = createSelector(
    getInformCustomerFeatureState,
    state => state?.shipment
)

export function informReducer(state: InformState = initialState, action: InformCustomerActions): InformState {
    switch (action.type) {
        case InformActionTypes.Success:
            return {
                ...state,
                successMessage: action.payload,
                errorMessage: ''
            }
        case InformActionTypes.Failed:
            return {
                ...state,
                errorMessage: action.payload,
                successMessage: ''
            }
        case InformActionTypes.SetShipmentDetail:
            console.log("Shipment response :::", action.payload)
            return {
                ...state,
                shipment: action.payload as Shipment,
                successMessage: '',
                errorMessage: ''
            }
        default:
            state
    }
}