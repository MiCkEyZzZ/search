import {LOGIN_SUCCESS, REGISTRATION_SUCCESS} from '../types'

const token = localStorage.getItem('token')

const initialState = {
    isAuthenticated: !!token,
    user: null,
    token
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state}
        default: return state
    }
}
