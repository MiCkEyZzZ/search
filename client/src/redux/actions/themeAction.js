import {SET_THEME, SET_THEME_CHANGE} from '../types'

export const setTheme = ({type}) => ({
    type: SET_THEME,
    payload: {type}
})

export const setThemeChange = () => ({
    type: SET_THEME_CHANGE
})
