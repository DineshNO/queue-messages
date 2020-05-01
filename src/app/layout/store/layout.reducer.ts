import { LayoutActions, LayoutActionTypes } from './layout.action';
import * as fromRoot from '../../store/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    layout: LayoutState,
}

export interface LayoutState {
    successMessage: string,
    errorMessage: string
}

const initialState: LayoutState = {
    successMessage: '',
    errorMessage: ''
};

const getQueueListFeatureState = createFeatureSelector<LayoutState>('layout');

export const getSuccessMessage = createSelector(
    getQueueListFeatureState,
    state => state?.successMessage
)

export const getFailedMessage = createSelector(
    getQueueListFeatureState,
    state => state?.errorMessage
)

export function layoutReducer(state: LayoutState = initialState, action: LayoutActions) {
    switch (action.type) {
        case LayoutActionTypes.Success:
            return {
                ...state,
                successMessage: action.payload as string,
                errorMessage: ''
            }
        case LayoutActionTypes.Failed:
            console.log("Inside failed case")
            return {
                ...state,
                successMessage: '',
                errorMessage: action.payload as string
            }
        default:
            state    
    }
}