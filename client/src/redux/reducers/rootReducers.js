import {combineReducers} from 'redux'
import {selectReducer} from './selectReducer'
import {videoReducer} from './videoReducer'
import {authReducer} from './authReducer'
import {queryReducer} from './queryReducer'
import {tabsReducer} from './tabsReducer'
import {themesReducer} from './themesReducer'
import {rangeSliderReducer} from './rangeSliderReducer'
import {btnReducer} from './btnReducer'
import {plateReducer} from './plateReducer'
import {switchReducer} from './switchReducer'

export const rootReducer = combineReducers({
    selection: selectReducer,
    contents: videoReducer,
    button: btnReducer,
    themes: themesReducer,
    slider: rangeSliderReducer,
    query: queryReducer,
    tabs: tabsReducer,
    auth: authReducer,
    plate: plateReducer,
    radio: switchReducer
})
