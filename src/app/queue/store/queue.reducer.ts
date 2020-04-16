import * as queueActions from './queue.action'
import * as fromRoot from '../../store/app.reducer'
import { Queue } from '../../shared/queue.model'

export interface QueueState extends fromRoot.State {
    queues: Queue[]
}

const initialState: QueueState = {
    queues: []
}

export function queueReducer(state: QueueState = initialState, action: queueActions.QueueActions) {
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
    }
}