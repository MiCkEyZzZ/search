import {SET_RANGE_SLIDER} from '../types'

const initialState = {
    setRangeSlider: {
        defaultValue: 25
    }
}

export const rangeSliderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RANGE_SLIDER:
            return {...state, setRangeSlider: action.payload}
        default: return state
    }
}
