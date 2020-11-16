import {SET_BTN_QUICK, SET_BTN_AUTO_LOAD, SET_BTN_AUTO, SET_BTN_PROMPT, SET_BTN_WINDOW, SET_BTN_AD, SET_BTN_HOT, SET_BTN_POSITION} from '../types'

const initialState = {
    setButtonQuick: true,
    setButtonAutoLoad: false,
    setButtonAuto: false,
    setButtonPrompt: false,
    setButtonWindow: false,
    setButtonAd: false,
    setButtonHot: false,
    setButtonPosition: false
}

export const btnReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BTN_QUICK:
            return {...state, setButtonQuick: !state.setButtonQuick}
        case SET_BTN_AUTO_LOAD:
            return {...state, setButtonAutoLoad: !state.setButtonAutoLoad}
        case SET_BTN_AUTO:
            return {...state, setButtonAuto: !state.setButtonAuto}
        case SET_BTN_PROMPT:
            return {...state, setButtonPrompt: !state.setButtonPrompt}
        case SET_BTN_WINDOW:
            return {...state, setButtonWindow: !state.setButtonWindow}
        case SET_BTN_AD:
            return {...state, setButtonAd: !state.setButtonAd}
        case SET_BTN_HOT:
            return {...state, setButtonHot: !state.setButtonHot}
        case SET_BTN_POSITION:
            return {...state, setButtonPosition: !state.setButtonPosition}
            break
        default: return state
    }
}
