import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Queue } from '../../shared/queue.model';
import * as fromRoot from '../../store/app.reducer';
import { QueueActions, QueueActionTypes } from './queue.action';


export interface State extends fromRoot.State {
    queues: QueueState,
}

export interface QueueState {
    queues: Queue[];
    selectedQueues: string[],
    successMessage: string,
    error: string
}

const initialState: QueueState = {
    queues: [],
    selectedQueues: [],
    successMessage: '',
    error: ''
};

const getQueueListFeatureState = createFeatureSelector<QueueState>('queues');

export const getQueueList = createSelector(
    getQueueListFeatureState,
    state => state?.queues
)

export const getSuccessMessage = createSelector(
    getQueueListFeatureState,
    state => state?.successMessage
)

export const getError = createSelector(
    getQueueListFeatureState,
    state => state?.error
)

export function queueReducer(state: QueueState = initialState, action): QueueState {
    switch (action.type) {
        case QueueActionTypes.SetQueues:
            return {
                ...state,
                queues: action.payload
            }
        case QueueActionTypes.SetSuccessMessage:
            return {
                ...state,
                successMessage: action.payload as string,
                error: ''
            }
        case QueueActionTypes.SetErrorMessage:
            return {
                ...state,
                successMessage: '',
                error: action.payload as string
            }
    }
}