import {SET_THEME, SET_THEME_CHANGE} from '../types'

const initialState = {
    selectTheme: {
        type: 'default',
        darkmode: false
    }
}

export const themesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            return {...state, selectTheme: action.payload}
        case SET_THEME_CHANGE:
            return {...state, darkmode: !state.darkmode}
        default: return state
    }
}
