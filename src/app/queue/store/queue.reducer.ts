import * as queueActions from './queue.action'
import * as fromRoot from '../../store/app.reducer'
import { Queue } from '../../shared/queue.model'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State extends fromRoot.State {
    queues: QueueState,
}

export interface QueueState {
    queues: Queue[];
    selectedQueues: Queue[],
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

export function queueReducer(state: QueueState = initialState, action: queueActions.QueueActions): QueueState {
    switch (action.type) {
        case queueActions.SET_QUEUES:
            return {
                ...state,
                queues: [...action.payload]
            }
        case queueActions.SELECT_QUEUE:
            const index = action.payload['index'];
            const queue = state.queues[index];
            const updatedQueue = {
                ...queue,
                selected: !queue.selected
            }
            const queues = [...state.queues]
            queues[action.payload.index] = updatedQueue
            return {
                ...state,
                queues: queues
            }
        case queueActions.RESEND_SUCCESS:
            return {
                ...state,
                successMessage: 'Queue resend is successful',
                error:''
            }
        case queueActions.RESEND_FAILED:
            return {
                ...state,
                successMessage: '',
                error:'Queue resend failed'
            }
    }
}