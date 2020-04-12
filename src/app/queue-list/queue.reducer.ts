// import * as QueueActions from './queue.action';

// const initialState = {
//     queueLists: [
//         new Queue ("initial",2,false)
//     ]
// }

// export function queueReducer(state = initialState, action: QueueActions.QueueActions) {
//     switch (action.type) {
//         case QueueActions.RESEND_QUEUE:
//             return {
//                 ...state,
//                 queueLists: [...state.queueLists, action.payload]
//             }
//         default:
//             initialState
//     }
// }