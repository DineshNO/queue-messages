import * as queueActions from './queue.action'

const initialState = [
    {
        queues: []
    }
]

export function queueReducer(state = initialState, action: queueActions.QueueActions) {
    switch (action.type) {
        case queueActions.SET_QUEUES:
            return {
                ...state,
                queues: [...action.payload]
            }
    }
}