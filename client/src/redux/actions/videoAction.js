import {CREATE_VIDEO} from '../types'

export const createVideo = (video) => ({
    type: CREATE_VIDEO,
    payload: video
})
