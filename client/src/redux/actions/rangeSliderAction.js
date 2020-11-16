import {SET_RANGE_SLIDER} from '../types'

export const setRangeSlider = ({type}) => ({
    type: SET_RANGE_SLIDER,
    payload: {type}
})
