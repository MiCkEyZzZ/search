import {CREATE_QUERY} from '../types'

const initialState = {
    query: []
}

export const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUERY:
            return {...state, query: state.query.concat([action.payload])}
        default: return state
    }
}
