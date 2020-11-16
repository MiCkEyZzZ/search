import {SET_TABS} from '../types'

const initialState = {
    selectTabs: {
        type: 0,
        tab: 0
    }
}

export const tabsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABS:
            return {...state, selectTabs: action.payload}
        default: return state
    }
}
