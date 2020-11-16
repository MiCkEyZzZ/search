import {SET_SWITCH} from '../types'

const initialState = {
    checked: false
}

export const switchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SWITCH:
            return {...state, checked: !state.checked}
            break
        default: return state
    }
}
