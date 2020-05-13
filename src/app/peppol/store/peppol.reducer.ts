import * as fromRoot from '../../store/app.reducer';
import { PeppolQueueActions, PeppolQueueTypes } from './peppol.action';

export interface peppolState extends fromRoot.State {
    peppolState: PeppolState
}

export interface PeppolState {
    successMessage: string
    failedMessage: string
}

const initialState: PeppolState = {
    successMessage: '',
    failedMessage: ''
}

export function peppolReducer(state: PeppolState = initialState, action: PeppolQueueActions) {
    switch (action.type) {
        case PeppolQueueTypes.Success:
            return {
                ...state,
                successMessage: action.payload,
                errorMessage: ''
            }
        case PeppolQueueTypes.Failed:
            return {
                ...state,
                successMessage: '',
                errorMessage: action.payload
            }
        default: state
    }
}