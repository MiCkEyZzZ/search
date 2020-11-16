import {SET_PLATE} from '../types'

export const setPlate = ({type}) => ({
    type: SET_PLATE,
    payload: {type}
})
