import {CREATE_VIDEO} from '../types'

const initialState = {
    video: []
}

export const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_VIDEO:
            return {...state, video: state.video.concat([action.payload])}
        default: return state
    }
}
