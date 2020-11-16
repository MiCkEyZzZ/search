import {SET_PLATE} from '../types'

const initialState = {
    setPlateByType: {
        type: null
    }
}

export const plateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLATE:
            return {...state, setPlateByType: action.payload}
        default: return state
    }
}
