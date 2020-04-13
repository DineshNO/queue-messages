import * as appActions from './app.action'

const initialState = [
    {
        queues : []
    }
]

export function appReducer(state = initialState, action: appActions.appActions) {
    switch(action.type){
        case appActions.SET_QUEUES :
            return {
                ...state,
                queues : [...action.payload]
            }
    }
}