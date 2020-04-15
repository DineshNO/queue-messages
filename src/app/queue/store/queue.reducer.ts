import * as queueActions from './queue.action'
import * as fromRoot from '../../store/app.reducer'
import { Queue } from '../../shared/queue.model'

export interface QueueState extends fromRoot.State {
        queues: Queue[]
}

const initialState: QueueState = {
    queues : []
}

export function queueReducer(state : QueueState = initialState, action: queueActions.QueueActions) {
    switch (action.type) {
        case queueActions.SET_QUEUES:
            return {
                ...state,
                queues: [...action.payload]
            }
    }
}