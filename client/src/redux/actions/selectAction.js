import {
    SET_SELECT,
    SET_SELECT_COUNTRY,
    SET_SELECT_FONT,
    SET_SELECT_FONT_SIZE,
    SET_SELECT_LANGUAGE, SET_SELECT_PAGE_SIZE,
    SET_SELECT_SAVE, SET_SELECT_TITLE, SET_SELECT_PAGE_LOADER
} from '../types'

export const setSelect = ({type}) => ({
    type: SET_SELECT,
    payload: {type}
})

export const setSelectCountry = ({type}) => ({
    type: SET_SELECT_COUNTRY,
    payload: {type}
})

export const setSelectLanguage = ({type}) => ({
    type: SET_SELECT_LANGUAGE,
    payload: {type}
})

export const setSelectSave = ({type}) => ({
    type: SET_SELECT_SAVE,
    payload: {type}
})

export const setSelectFont = ({type}) => ({
    type: SET_SELECT_FONT,
    payload: {type}
})

export const setSelectFontSize = ({type}) => ({
    type: SET_SELECT_FONT_SIZE,
    payload: {type}
})

export const setSelectPageSize = ({type}) => ({
    type: SET_SELECT_PAGE_SIZE,
    payload: {type}
})

export const setSelectTitle = ({type}) => ({
    type: SET_SELECT_TITLE,
    payload: {type}
})

export const setSelectPageLoader = ({type}) => ({
    type: SET_SELECT_PAGE_LOADER,
    payload: {type}
})
