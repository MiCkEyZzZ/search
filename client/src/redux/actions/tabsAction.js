import {SET_TABS} from '../types'

export const setTabs = ({type}) => ({
    type: SET_TABS,
    payload: {type}
})
