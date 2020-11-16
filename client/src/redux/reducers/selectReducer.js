import {
    SET_SELECT,
    SET_SELECT_COUNTRY,
    SET_SELECT_FONT,
    SET_SELECT_FONT_SIZE,
    SET_SELECT_LANGUAGE, SET_SELECT_PAGE_SIZE,
    SET_SELECT_SAVE, SET_SELECT_TITLE,
    SET_SELECT_PAGE_LOADER
} from '../types'

const initialState = {
    selectBySort: {
        type: 'relevant'
    },
    selectByCountry: {
        type: 'all'
    },
    selectByLanguage: {
        type: 'ru'
    },
    selectBySave: {
        type: 'mild'
    },
    selectByFont: {
        type: 'ar'
    },
    selectByFontSize: {
        type: 'mild'
    },
    selectByPageSize: {
        type: 'normal'
    },
    selectByTitle: {
        type: 'of'
    },
    selectByPageLoader: {
        type: 'default'
    }
}

export const selectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECT:
            return {...state, selectBySort: action.payload}
        case SET_SELECT_COUNTRY:
            return {...state, selectByCountry: action.payload}
        case SET_SELECT_LANGUAGE:
            return {...state, selectByLanguage: action.payload}
        case SET_SELECT_SAVE:
            return {...state, selectBySave: action.payload}
        case SET_SELECT_FONT:
            return {...state, selectByFont: action.payload}
        case SET_SELECT_FONT_SIZE:
            return {...state, selectByFontSize: action.payload}
        case SET_SELECT_PAGE_SIZE:
            return {...state, selectByPageSize: action.payload}
        case SET_SELECT_TITLE:
            return {...state, selectByTitle: action.payload}
        case SET_SELECT_PAGE_LOADER:
            return {...state, selectByPageLoader: action.payload}
        default: return state
    }
}
